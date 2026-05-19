"use client";

import { useEffect } from "react";
import { useCosmosStore } from "@/store/useCosmosStore";
import CosmosCanvas from "@/components/engine/CosmosCanvas";
import AudioEngine from "@/components/engine/AudioEngine";
import HUD from "@/components/hud/HUD";
import IntroOverlay from "@/components/ui/IntroOverlay";

export default function CosmosPage() {
  const isStarted = useCosmosStore((state) => state.isStarted);
  const setScroll = useCosmosStore((state) => state.setScroll);

  // Sync scroll height with the Zustand physical timeline engine on started
  useEffect(() => {
    if (!isStarted) {
      // Disable body scroll when intro splash is present
      document.body.style.overflow = "hidden";
      return;
    }

    // Re-enable scrolling for simulation
    document.body.style.overflow = "auto";

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = window.scrollY / scrollHeight;
      setScroll(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Trigger once to align physical initial values
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "auto";
    };
  }, [isStarted, setScroll]);

  return (
    <main className="relative w-full min-h-screen bg-[#020206] select-none text-[#f8fafc] overflow-x-hidden">
      {/* R3F 3D WebGL Canvas Layer */}
      <CosmosCanvas />

      {/* Dynamic Tone.js Synthesizer Engine */}
      <AudioEngine />

      {/* 2D HUD Dashboard and Information Panel Overlay */}
      {isStarted && <HUD />}

      {/* Cinematic intro gate / context trigger */}
      <IntroOverlay />

      {/* Scrollable Spacer to generate scroll momentum (10x screen size) */}
      {isStarted && (
        <div className="relative w-full h-[1000vh] pointer-events-none z-10" />
      )}
    </main>
  );
}
