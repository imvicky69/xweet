"use client";

import React, { useEffect, useRef, useState } from "react";
import { Compass, Sparkles, Navigation } from "lucide-react";

interface TargetLocation {
  name: string;
  coords: string;
  lat: number;
  lng: number;
}

const TARGETS: TargetLocation[] = [
  { name: "Kyoto Mountain Route", coords: "35.0528° N, 135.7906° E", lat: 35.0528, lng: 135.7906 },
  { name: "Vík Coastal Highway", coords: "63.4186° N, 19.0060° W", lat: 63.4186, lng: -19.006 },
  { name: "Amalfi Cliff Road", coords: "40.6340° N, 14.6027° E", lat: 40.634, lng: 14.6027 },
  { name: "Patagonia Route 237", coords: "41.0548° S, 71.1895° W", lat: -41.0548, lng: -71.1895 },
  { name: "Geiranger Pass", coords: "62.1004° N, 7.2054° E", lat: 62.1004, lng: 7.2054 },
];

export default function HeroCartographyGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeTargetIdx, setActiveTargetIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse inertia target & current angles
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false });
  const rotRef = useRef({ yaw: 0.3, pitch: 0.25, targetYaw: 0.3, targetPitch: 0.25 });

  // Generate sphere surface points once (seeded deterministic matrix)
  const spherePointsRef = useRef<Array<{ x: number; y: number; z: number; isLand?: boolean }>>([]);

  useEffect(() => {
    const points: Array<{ x: number; y: number; z: number; isLand?: boolean }> = [];
    const count = 380;
    const radius = 100;

    // Fibonacci sphere distribution for uniform points
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Group some points as "landmass clusters"
      const isLand = Math.sin(x * 3) * Math.cos(y * 4) + Math.sin(z * 3) > 0.1;
      points.push({ x: x * radius, y: y * radius, z: z * radius, isLand });
    }
    spherePointsRef.current = points;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    // Handle high DPI crispness
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Pause animation when scrolled offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    if (containerRef.current) observer.observe(containerRef.current);

    // Render loop
    const radius = 105;
    const fov = 340;
    const distance = 420;

    let pulseTime = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      pulseTime += 0.035;

      // Auto rotation + mouse interaction
      if (!mouseRef.current.isHovering) {
        rotRef.current.targetYaw += 0.0035;
      }

      // Smooth damping (lerp)
      rotRef.current.yaw += (rotRef.current.targetYaw - rotRef.current.yaw) * 0.06;
      rotRef.current.pitch += (rotRef.current.targetPitch - rotRef.current.pitch) * 0.06;

      const yaw = rotRef.current.yaw;
      const pitch = rotRef.current.pitch;

      const rect = canvas.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      ctx.clearRect(0, 0, rect.width, rect.height);

      // Helper 3D rotation & projection
      const project = (x: number, y: number, z: number) => {
        // Yaw (around Y axis)
        const cosY = Math.cos(yaw);
        const sinY = Math.sin(yaw);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;

        // Pitch (around X axis)
        const cosP = Math.cos(pitch);
        const sinP = Math.sin(pitch);
        const y2 = y * cosP - z1 * sinP;
        const z2 = y * sinP + z1 * cosP;

        // Perspective
        const scale = fov / (distance + z2);
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          pz: z2,
          scale,
        };
      };

      // 1. Draw subtle outer orbital radar ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(133, 135, 121, 0.15)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 2. Draw Latitude Wireframe Rings (Parallels)
      const latSteps = [-60, -30, 0, 30, 60];
      for (const latDeg of latSteps) {
        const phi = (latDeg * Math.PI) / 180;
        const ringRadius = radius * Math.cos(phi);
        const ringY = -radius * Math.sin(phi);

        ctx.beginPath();
        const segments = 48;
        let isFirst = true;

        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          const rx = ringRadius * Math.cos(theta);
          const rz = ringRadius * Math.sin(theta);
          const p = project(rx, ringY, rz);

          // Fade out back-facing curve
          if (p.pz > 0) {
            ctx.strokeStyle = latDeg === 0 ? "rgba(23, 24, 21, 0.28)" : "rgba(133, 135, 121, 0.16)";
          } else {
            ctx.strokeStyle = "rgba(133, 135, 121, 0.06)";
          }

          if (isFirst) {
            ctx.moveTo(p.px, p.py);
            isFirst = false;
          } else {
            ctx.lineTo(p.px, p.py);
          }
        }
        ctx.lineWidth = latDeg === 0 ? 1.2 : 0.8;
        ctx.stroke();
      }

      // 3. Draw Longitude Wireframe Meridians
      const lonSteps = 6;
      for (let m = 0; m < lonSteps; m++) {
        const meridianAngle = (m / lonSteps) * Math.PI;

        ctx.beginPath();
        const segments = 48;
        let isFirst = true;

        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          const rx = radius * Math.sin(theta) * Math.cos(meridianAngle);
          const ry = radius * Math.cos(theta);
          const rz = radius * Math.sin(theta) * Math.sin(meridianAngle);
          const p = project(rx, ry, rz);

          if (isFirst) {
            ctx.moveTo(p.px, p.py);
            isFirst = false;
          } else {
            ctx.lineTo(p.px, p.py);
          }
        }
        ctx.strokeStyle = "rgba(133, 135, 121, 0.12)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // 4. Draw Constellation Dot Matrix
      const points = spherePointsRef.current;
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const p = project(pt.x, pt.y, pt.z);

        // Only draw front-facing hemisphere or faint back points
        const isFront = p.pz > -20;
        const alpha = isFront
          ? Math.max(0.15, (p.pz + radius) / (radius * 2)) * (pt.isLand ? 0.75 : 0.35)
          : 0.05;

        ctx.beginPath();
        const dotRadius = isFront ? (pt.isLand ? 1.6 : 1.1) : 0.7;
        ctx.arc(p.px, p.py, dotRadius, 0, Math.PI * 2);

        if (pt.isLand) {
          ctx.fillStyle = `rgba(23, 24, 21, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(133, 135, 121, ${alpha})`;
        }
        ctx.fill();
      }

      // 5. Draw Active Target Location Pulse Pin (Signal Lime Pin on Globe)
      const target = TARGETS[activeTargetIdx];
      const targetPhi = (target.lat * Math.PI) / 180;
      const targetTheta = (target.lng * Math.PI) / 180;

      const tx = radius * Math.cos(targetPhi) * Math.cos(targetTheta);
      const ty = -radius * Math.sin(targetPhi);
      const tz = radius * Math.cos(targetPhi) * Math.sin(targetTheta);

      const targetProj = project(tx, ty, tz);

      // Only show pulse when facing towards camera
      if (targetProj.pz > -15) {
        const pulse = (Math.sin(pulseTime * 2.5) + 1) / 2; // 0 to 1
        const ringSize = 6 + pulse * 14;

        // Outer pulse wave
        ctx.beginPath();
        ctx.arc(targetProj.px, targetProj.py, ringSize, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(215, 243, 106, ${0.8 - pulse * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner solid core
        ctx.beginPath();
        ctx.arc(targetProj.px, targetProj.py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#D7F36A";
        ctx.fill();
        ctx.strokeStyle = "#171815";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Target Tag Line
        const tagX = targetProj.px + 14;
        const tagY = targetProj.py - 12;

        ctx.beginPath();
        ctx.moveTo(targetProj.px, targetProj.py);
        ctx.lineTo(tagX, tagY);
        ctx.lineTo(tagX + 32, tagY);
        ctx.strokeStyle = "rgba(23, 24, 21, 0.45)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.font = "9px monospace";
        ctx.fillStyle = "#171815";
        ctx.fillText("TARGET LOC", tagX + 36, tagY + 3);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [activeTargetIdx]);

  // Mouse tilt controller
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    mouseRef.current.isHovering = true;
    rotRef.current.targetYaw = nx * 1.6 + 0.3;
    rotRef.current.targetPitch = ny * 1.1 + 0.25;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isHovering = false;
    setIsHovered(false);
  };

  const nextTarget = () => {
    setActiveTargetIdx((prev) => (prev + 1) % TARGETS.length);
  };

  const current = TARGETS[activeTargetIdx];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[420px] aspect-square rounded-3xl border border-terrain/30 bg-white/40 backdrop-blur-xs p-5 sm:p-6 shadow-sm flex flex-col justify-between overflow-hidden group select-none transition-all duration-300 hover:border-carbon/50 hover:bg-white/60"
    >
      {/* Editorial Technical Corner Brackets */}
      <span className="absolute top-2.5 left-2.5 text-[10px] font-mono text-terrain/60 pointer-events-none">+</span>
      <span className="absolute top-2.5 right-2.5 text-[10px] font-mono text-terrain/60 pointer-events-none">+</span>
      <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-terrain/60 pointer-events-none">+</span>
      <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono text-terrain/60 pointer-events-none">+</span>

      {/* Top Telemetry Strip */}
      <div className="relative z-10 flex items-center justify-between border-b border-terrain/20 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-signal-lime animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-carbon font-semibold">
            3D Coordinate Telemetry
          </span>
        </div>

        <button
          onClick={nextTarget}
          className="cursor-pointer text-[10px] font-mono text-terrain hover:text-carbon bg-black/[0.04] hover:bg-black/[0.08] px-2 py-0.5 rounded-full border border-terrain/25 transition-colors flex items-center gap-1"
          title="Click to cycle survey coordinate"
        >
          <Navigation className="w-2.5 h-2.5 text-terrain group-hover:text-carbon" />
          <span>CYCLE POINT</span>
        </button>
      </div>

      {/* Interactive 3D Canvas */}
      <div className="relative flex-1 flex items-center justify-center my-1">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing max-h-[250px]"
        />

        {/* Floating Center Compass Badge */}
        <div className="absolute pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity">
          <Compass className="w-10 h-10 text-terrain/30" />
        </div>
      </div>

      {/* Bottom Coordinates & Live Biome Readout */}
      <div className="relative z-10 border-t border-terrain/20 pt-3 flex items-center justify-between font-mono text-xs">
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase tracking-wider text-terrain block">
            {current.name}
          </span>
          <span className="text-carbon font-medium text-xs block">
            {current.coords}
          </span>
        </div>

        <div className="text-right">
          <span className="text-[9px] uppercase tracking-wider text-signal-lime bg-carbon px-2 py-0.5 rounded font-medium">
            360° LIVE
          </span>
          <span className="text-[10px] text-terrain block mt-0.5">
            {isHovered ? "INTERACTIVE TILT" : "ORBIT ACTIVE"}
          </span>
        </div>
      </div>
    </div>
  );
}
