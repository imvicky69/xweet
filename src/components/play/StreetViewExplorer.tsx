"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import {
  Maximize2,
  Minimize2,
  Compass,
  AlertTriangle,
  KeyRound,
  RefreshCw,
  RotateCw,
} from "lucide-react";

interface StreetViewExplorerProps {
  location: {
    id: string;
    lat: number;
    lng: number;
    heading?: number;
    pitch?: number;
  };
  onPanoramaReady?: () => void;
  onError?: (msg: string) => void;
}

export default function StreetViewExplorer({
  location,
  onPanoramaReady,
  onError,
}: StreetViewExplorerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panoMountRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [errorType, setErrorType] = useState<"missing-key" | "load-failed" | "zero-results" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [heading, setHeading] = useState<number>(location.heading || 0);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  // Mount or update the Street View Panorama
  const mountPanorama = useCallback(
    (panoId: string, panoPosition: google.maps.LatLng) => {
      if (!panoMountRef.current || !window.google?.maps) return;

      try {
        if (!panoramaRef.current) {
          // Initialize fresh panorama instance
          const pano = new window.google.maps.StreetViewPanorama(panoMountRef.current, {
            pano: panoId,
            position: panoPosition,
            pov: { heading: location.heading || 0, pitch: location.pitch || 0 },
            zoom: 1,
            clickToGo: true,
            linksControl: true,
            panControl: true,
            zoomControl: true,
            scrollwheel: true,
            enableCloseButton: false,
            addressControl: false,
            showRoadLabels: false,
            motionTracking: false,
            motionTrackingControl: false,
            fullscreenControl: false,
          });

          pano.addListener("pov_changed", () => {
            const currentPov = pano.getPov();
            setHeading(Math.round(currentPov.heading % 360));
          });

          pano.addListener("status_changed", () => {
            const st = pano.getStatus();
            if (st && st !== "OK") {
              console.warn("StreetView status changed to:", st);
              setErrorType("load-failed");
              setErrorMessage(
                "Panorama imagery could not be streamed for this position. Click Reload to re-fetch."
              );
              setIsLoading(false);
            } else if (st === "OK") {
              setIsLoading(false);
              setErrorType(null);
            }
          });

          panoramaRef.current = pano;
        } else {
          // Re-use existing panorama instance (preserves WebGL context and prevents black screen)
          panoramaRef.current.setVisible(true);
          panoramaRef.current.setPano(panoId);
          panoramaRef.current.setPov({
            heading: location.heading || 0,
            pitch: location.pitch || 0,
          });
          panoramaRef.current.setZoom(1);

          // Trigger resize to force WebGL canvas repaint
          setTimeout(() => {
            if (panoramaRef.current && window.google?.maps?.event) {
              window.google.maps.event.trigger(panoramaRef.current, "resize");
            }
          }, 60);
        }

        setIsLoading(false);
        if (onPanoramaReady) onPanoramaReady();
      } catch (err: unknown) {
        console.error("Error mounting Street View panorama:", err);
        setErrorType("load-failed");
        setErrorMessage("WebGL rendering error. Click Reload View to retry.");
        setIsLoading(false);
      }
    },
    [location.heading, location.pitch, onPanoramaReady]
  );

  // Initialize or fetch location Street View
  const initStreetView = useCallback(async () => {
    if (!apiKey) {
      setIsLoading(false);
      setErrorType("missing-key");
      setErrorMessage(
        "Google Maps API Key is missing. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment."
      );
      if (onError) onError("Missing Google Maps API Key.");
      return;
    }

    if (!panoMountRef.current) return;

    setIsLoading(true);
    setErrorType(null);
    setErrorMessage("");

    try {
      setOptions({
        key: apiKey,
        v: "weekly",
      });

      await importLibrary("maps");
      await importLibrary("streetView");

      if (!panoMountRef.current || !window.google?.maps) return;

      const position = { lat: location.lat, lng: location.lng };
      const svService = new window.google.maps.StreetViewService();

      let foundData: google.maps.StreetViewPanoramaData | null = null;

      // 1. Try finding official OUTDOOR road captures first (avoids corrupted/black user photospheres)
      const outdoorRadii = [100, 500, 2500, 8000];
      for (const radius of outdoorRadii) {
        const res = await new Promise<{
          data: google.maps.StreetViewPanoramaData | null;
          status: string;
        }>((resolve) => {
          svService.getPanorama(
            {
              location: position,
              radius,
              preference: window.google.maps.StreetViewPreference.BEST,
              sources: [window.google.maps.StreetViewSource.OUTDOOR],
            },
            (data, status) => resolve({ data, status: String(status) })
          );
        });

        if (res.status === "OK" && res.data?.location?.pano && res.data.location.latLng) {
          foundData = res.data;
          if (res.data.links && res.data.links.length > 0) {
            break; // Ideal road capture with movement links!
          }
        }
      }

      // 2. Fallback to default source if outdoor specific was not found
      if (!foundData) {
        const fallbackRadii = [500, 3000, 15000];
        for (const radius of fallbackRadii) {
          const res = await new Promise<{
            data: google.maps.StreetViewPanoramaData | null;
            status: string;
          }>((resolve) => {
            svService.getPanorama(
              {
                location: position,
                radius,
                preference: window.google.maps.StreetViewPreference.BEST,
              },
              (data, status) => resolve({ data, status: String(status) })
            );
          });

          if (res.status === "OK" && res.data?.location?.pano && res.data.location.latLng) {
            foundData = res.data;
            break;
          }
        }
      }

      if (!foundData?.location?.pano || !foundData.location.latLng) {
        setIsLoading(false);
        setErrorType("zero-results");
        setErrorMessage(
          `Street View coverage is unavailable near coordinates: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}.`
        );
        return;
      }

      mountPanorama(foundData.location.pano, foundData.location.latLng);
    } catch (err: unknown) {
      console.error("Google Street View initialization error:", err);
      setIsLoading(false);
      setErrorType("load-failed");
      const msg = err instanceof Error ? err.message : "Failed to load Google Maps SDK.";
      setErrorMessage(msg);
      if (onError) onError(msg);
    }
  }, [apiKey, location, onError, mountPanorama]);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      if (active) {
        initStreetView();
      }
    }, 0);

    return () => {
      active = false;
      clearTimeout(timer);
      // Clean up visibility on unmount to conserve WebGL contexts
      if (panoramaRef.current) {
        panoramaRef.current.setVisible(false);
      }
    };
  }, [initStreetView]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const resetCamera = () => {
    if (panoramaRef.current) {
      panoramaRef.current.setPov({
        heading: location.heading || 0,
        pitch: location.pitch || 0,
      });
      panoramaRef.current.setZoom(1);
    }
  };

  const handleManualReload = () => {
    if (panoramaRef.current && window.google?.maps?.event) {
      window.google.maps.event.trigger(panoramaRef.current, "resize");
    }
    initStreetView();
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-3xl border border-terrain/35 bg-carbon transition-all select-none shadow-md ${
        isFullscreen ? "h-screen rounded-none" : "h-[500px] sm:h-[600px] lg:h-[680px]"
      }`}
    >
      {/* Real Google Street View Mount Point Container */}
      <div
        ref={panoMountRef}
        id="google-street-view-canvas"
        className="w-full h-full"
      />

      {/* Loading State Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-carbon/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-paper space-y-4 z-20 pointer-events-auto">
          <div className="w-12 h-12 rounded-2xl bg-signal-lime/20 border border-signal-lime/60 flex items-center justify-center animate-spin">
            <Compass className="w-6 h-6 text-signal-lime" />
          </div>
          <div className="text-center space-y-1">
            <span className="text-xs font-mono text-signal-lime uppercase tracking-widest block">
              Google Street View
            </span>
            <p className="text-sm font-space text-paper">Streaming 360° road panorama...</p>
          </div>
        </div>
      )}

      {/* Missing API Key or Error State */}
      {errorType && !isLoading && (
        <div className="absolute inset-0 bg-paper p-6 sm:p-10 flex flex-col items-center justify-center text-carbon text-center z-20 space-y-5 pointer-events-auto">
          <div className="w-12 h-12 rounded-2xl bg-signal-lime/30 border border-signal-lime/80 flex items-center justify-center">
            {errorType === "missing-key" ? (
              <KeyRound className="w-6 h-6 text-carbon" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-carbon" />
            )}
          </div>

          <div className="max-w-md space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-terrain">
              {errorType === "missing-key" ? "Setup Required" : "Street View Notice"}
            </span>
            <h3 className="text-2xl font-space font-medium text-carbon">
              {errorType === "missing-key"
                ? "Google Maps API Key Missing"
                : "Unable to Stream Panorama"}
            </h3>
            <p className="text-xs sm:text-sm text-terrain leading-relaxed">
              {errorMessage}
            </p>
          </div>

          {errorType === "missing-key" && (
            <div className="p-4 rounded-2xl bg-carbon/5 border border-terrain/30 font-mono text-xs text-left max-w-lg space-y-1 text-carbon">
              <span className="text-terrain uppercase text-[10px] block">
                Required Configuration (.env):
              </span>
              <code className="text-carbon font-semibold select-all block">
                NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=&quot;YOUR_API_KEY&quot;
              </code>
              <span className="text-terrain text-[11px] block pt-1">
                Ensure <strong>Maps JavaScript API</strong> is enabled on your Google Cloud project.
              </span>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleManualReload}
              className="cursor-pointer px-6 py-2.5 rounded-xl bg-carbon text-paper hover:bg-carbon/90 text-xs font-mono transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Panorama</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Left: Telemetry HUD Overlay */}
      {!errorType && (
        <div className="pointer-events-none absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-1 font-mono text-[11px] text-paper/90 bg-carbon/80 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-terrain/40 shadow-xs z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-signal-lime animate-pulse inline-block" />
            <span className="text-signal-lime font-semibold tracking-wider">RECON FEED</span>
            <span className="text-terrain/70">•</span>
            <span className="text-terrain text-[10px]">ROAD NETWORK</span>
          </div>
          <div className="text-[10px] text-terrain">
            HEADING: <span className="text-paper">{heading}°</span> • MOVE: <span className="text-signal-lime">CLICK ROADS</span>
          </div>
        </div>
      )}

      {/* Top Right: Compass Reset, Manual Reload & Fullscreen Controls */}
      {!errorType && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-10 pointer-events-auto">
          {/* Quick Reload Camera in case of WebGL glitch */}
          <button
            onClick={handleManualReload}
            className="cursor-pointer w-11 h-11 rounded-2xl bg-carbon/85 hover:bg-carbon text-paper border border-terrain/50 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            title="Reload Panorama View"
          >
            <RotateCw className="w-4 h-4 text-signal-lime" />
          </button>

          {/* Compass Reset */}
          <button
            onClick={resetCamera}
            className="cursor-pointer w-11 h-11 rounded-2xl bg-carbon/85 hover:bg-carbon text-paper border border-terrain/50 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            title="Reset to North (0°)"
          >
            <Compass className="w-5 h-5 text-signal-lime" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="cursor-pointer w-11 h-11 rounded-2xl bg-carbon/85 hover:bg-carbon text-paper border border-terrain/50 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Viewport"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-paper" />
            ) : (
              <Maximize2 className="w-4 h-4 text-paper" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
