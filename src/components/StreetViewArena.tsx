"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Compass as CompassIcon,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Navigation,
  Crosshair,
  MapPin,
  Sparkles,
} from "lucide-react";
import { LocationItem } from "@/data/locations";

interface StreetViewArenaProps {
  location: LocationItem;
  onOpenGuesser: () => void;
  selectedCountryName: string | null;
  googleMapsApiKey?: string;
}

export default function StreetViewArena({
  location,
  onOpenGuesser,
  selectedCountryName,
  googleMapsApiKey,
}: StreetViewArenaProps) {
  const [heading, setHeading] = useState(45);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pitch, setPitch] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Drag / Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;

    setHeading((prev) => (prev - deltaX * 0.25 + 360) % 360);
    setPitch((prev) => Math.max(-25, Math.min(25, prev - deltaY * 0.15)));

    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  }, [isDragging, dragStartX, dragStartY]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Touch Support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStartX(e.touches[0].clientX);
      setDragStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    const deltaY = e.touches[0].clientY - dragStartY;

    setHeading((prev) => (prev - deltaX * 0.35 + 360) % 360);
    setPitch((prev) => Math.max(-25, Math.min(25, prev - deltaY * 0.2)));

    setDragStartX(e.touches[0].clientX);
    setDragStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const resetCamera = () => {
    setHeading(0);
    setPitch(0);
    setZoomLevel(1);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-3xl border border-terrain/35 bg-carbon select-none ${
        isFullscreen ? "h-screen rounded-none" : "h-[540px] sm:h-[620px]"
      } transition-all shadow-lg group`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* Background Street View Imagery */}
      {googleMapsApiKey ? (
        <iframe
          title="Google Street View"
          width="100%"
          height="100%"
          className="border-0 pointer-events-auto"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/streetview?key=${googleMapsApiKey}&location=${location.coordinates.lat},${location.coordinates.lng}&heading=${heading}&pitch=${pitch}`}
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out"
          style={{
            backgroundImage: `url(${location.streetViewUrl})`,
            transform: `scale(${zoomLevel}) translate(${(heading % 360) * 0.6}px, ${pitch * 2}px)`,
            filter: "contrast(1.04) brightness(1.02)",
          }}
        >
          {/* Subtle Lens & Vignette effect */}
          <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_60%,_rgba(23,24,21,0.45)_100%]" />
        </div>
      )}

      {/* Grid Reticle & Center Crosshair */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
        <Crosshair className="w-10 h-10 text-paper stroke-[1]" />
      </div>

      {/* Top Left: Telemetry HUD */}
      <div className="pointer-events-none absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-1.5 font-mono text-[11px] text-paper/90 bg-carbon/80 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-terrain/40 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-signal-lime animate-pulse inline-block" />
          <span className="text-signal-lime font-semibold tracking-wider">LIVE TELEMETRY</span>
          <span className="text-terrain/70">•</span>
          <span className="text-terrain text-[10px]">360° PANO</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-paper/70 pt-0.5">
          <span>LAT: ••••.••••°</span>
          <span>LON: ••••.••••°</span>
          <span>ELEV: 284m</span>
        </div>
        <div className="text-[10px] text-terrain">
          HEADING: <span className="text-paper">{Math.round(heading)}°</span> • PITCH: <span className="text-paper">{Math.round(pitch)}°</span>
        </div>
      </div>

      {/* Top Right: Compass Needle Widget */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3">
        <div
          onClick={resetCamera}
          className="cursor-pointer w-12 h-12 rounded-full bg-carbon/85 backdrop-blur-md border border-terrain/50 shadow-md flex items-center justify-center relative hover:scale-105 transition-transform"
          title="Click to reset North"
        >
          {/* Compass Rose */}
          <Navigation
            className="w-5 h-5 text-signal-lime transition-transform duration-150"
            style={{ transform: `rotate(${-heading}deg)` }}
          />
          <span className="absolute top-1 text-[8px] font-mono font-bold text-signal-lime">N</span>
        </div>
      </div>

      {/* Bottom Center: Drag Hint */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-carbon/70 backdrop-blur-xs border border-terrain/30 text-paper/75 text-[11px] font-mono">
        <RotateCcw className="w-3 h-3 text-signal-lime" />
        <span>Click &amp; drag to inspect terrain</span>
      </div>

      {/* Bottom Left: Camera Controls */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2">
        <button
          onClick={() => setZoomLevel((z) => Math.min(2, z + 0.2))}
          className="cursor-pointer w-9 h-9 rounded-xl bg-carbon/80 hover:bg-carbon text-paper border border-terrain/40 flex items-center justify-center transition-all hover:border-paper"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(1, z - 0.2))}
          className="cursor-pointer w-9 h-9 rounded-xl bg-carbon/80 hover:bg-carbon text-paper border border-terrain/40 flex items-center justify-center transition-all hover:border-paper"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={toggleFullscreen}
          className="cursor-pointer w-9 h-9 rounded-xl bg-carbon/80 hover:bg-carbon text-paper border border-terrain/40 flex items-center justify-center transition-all hover:border-paper"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Right: Quick Guess Drawer Action */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
        <button
          onClick={onOpenGuesser}
          className="cursor-pointer bg-signal-lime hover:bg-[#cbf056] text-carbon px-5 py-3 rounded-2xl font-semibold text-sm shadow-xl flex items-center gap-2.5 transition-all duration-200 hover:scale-105 active:scale-95 border border-signal-lime/80"
        >
          <MapPin className="w-4 h-4 text-carbon fill-carbon" />
          <span>
            {selectedCountryName ? (
              <>Guess: <strong className="font-bold underline">{selectedCountryName}</strong></>
            ) : (
              "Select Country on Map"
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
