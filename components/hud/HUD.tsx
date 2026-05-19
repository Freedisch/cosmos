"use client";

import { useState } from "react";
import { useCosmosStore } from "@/store/useCosmosStore";
import { ERAS, Era } from "@/physics/timeline";
import {
  formatTime,
  formatTemperature,
  formatDensity,
  formatDiameter,
  getHubbleParameter,
} from "@/physics/cosmology";
import { getElementColor } from "@/physics/color";
import {
  Volume2,
  VolumeX,
  Sparkles,
  ChevronRight,
  Info,
  Maximize2,
  Minimize2,
  Cpu,
} from "lucide-react";

export default function HUD() {
  const scroll = useCosmosStore((state) => state.scroll);
  const time = useCosmosStore((state) => state.time);
  const temperature = useCosmosStore((state) => state.temperature);
  const density = useCosmosStore((state) => state.density);
  const diameter = useCosmosStore((state) => state.diameter);
  const scaleFactor = useCosmosStore((state) => state.scaleFactor);
  const activeEra = useCosmosStore((state) => state.activeEra);
  
  const isMuted = useCosmosStore((state) => state.isMuted);
  const setMuted = useCosmosStore((state) => state.setMuted);
  const quality = useCosmosStore((state) => state.quality);
  const setQuality = useCosmosStore((state) => state.setQuality);

  const [isExpanded, setIsExpanded] = useState(true);

  // Time format calculations
  const formattedTime = formatTime(time);
  const formattedTemp = formatTemperature(temperature);
  const formattedDensity = formatDensity(density);
  const formattedDiameter = formatDiameter(diameter);
  const hubbleRate = getHubbleParameter(scaleFactor);

  // Trigger smooth scroll when user jumps to an era
  const handleEraJump = (era: Era) => {
    const targetScroll = era.scrollStart + 0.005; // slightly offset from boundary
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetScroll * scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-20 flex flex-col justify-between p-4 md:p-6 font-sans">
      
      {/* 1. TOP HEADER HUD */}
      <header className="w-full flex justify-between items-center pointer-events-auto">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
            <h1 className="text-xl md:text-2xl font-black tracking-widest text-white uppercase text-gradient">
              Cosmos
            </h1>
          </div>
          <p className="text-[10px] md:text-xs tracking-wider text-indigo-300 uppercase font-medium">
            Simulating 13.8 Billion Years of History
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2 md:gap-3 glass px-3 py-1.5 md:py-2 rounded-full border-indigo-500/20 shadow-md">
          {/* MUTE TOGGLE */}
          <button
            onClick={() => setMuted(!isMuted)}
            className="p-1 rounded-full text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
            title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
          </button>

          <span className="w-[1px] h-4 bg-white/10" />

          {/* QUALITY PRESET TOGGLES */}
          <div className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-indigo-300 mr-1" />
            {(["low", "medium", "high"] as const).map((q) => (
              <button
                key={q}
                onClick={() => setQuality(q)}
                className={`text-[9px] md:text-xs px-2 py-0.5 rounded-md font-semibold transition-all uppercase ${
                  quality === q
                    ? "bg-indigo-600/90 text-white shadow-sm"
                    : "text-indigo-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 2. MIDDLE VIEWPORT (LEFT SIDEBAR ERA NAV & RIGHT PANEL INFO) */}
      <div className="flex-1 my-4 md:my-6 flex justify-between items-center relative overflow-hidden min-h-0">
        
        {/* ERA QUICK-JUMP NAVIGATION (LEFT) */}
        <nav className="hidden lg:flex flex-col gap-2 pointer-events-auto bg-black/30 backdrop-blur-md p-3 rounded-2xl border border-white/5">
          <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 mb-2 border-b border-indigo-500/20 pb-1">
            Cosmic Timeline
          </p>
          <div className="flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto pr-1">
            {ERAS.map((era) => {
              const isActive = activeEra.id === era.id;
              return (
                <button
                  key={era.id}
                  onClick={() => handleEraJump(era)}
                  className={`flex items-center text-left py-1 px-3 rounded-lg group transition-all text-xs border ${
                    isActive
                      ? "bg-indigo-600/20 border-indigo-500/50 text-white font-bold glass-glow"
                      : "border-transparent text-indigo-300/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-2.5 transition-all ${
                      isActive ? "bg-indigo-400 scale-125 shadow-md shadow-indigo-500" : "bg-white/20 group-hover:bg-indigo-400"
                    }`}
                  />
                  <span>{era.shortName}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* NARRATIVE INFORMATION PANEL (RIGHT) */}
        <section className="absolute right-0 max-w-sm md:max-w-md w-full pointer-events-auto flex flex-col items-end z-30">
          <div className="glass glass-glow p-4 rounded-3xl border-indigo-500/10 shadow-2xl flex flex-col gap-3 w-full transition-all">
            
            {/* Header / Era Title */}
            <div className="flex justify-between items-start gap-2 border-b border-white/10 pb-2">
              <div>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                  Epoch {activeEra.id + 1} of 13
                </p>
                <h2 className="text-lg md:text-xl font-extrabold text-white text-glow">
                  {activeEra.name}
                </h2>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded-full hover:bg-white/10 text-indigo-300 hover:text-white transition-colors"
                title={isExpanded ? "Collapse Details" : "Expand Details"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Narrative & Physics description */}
            <p className="text-xs md:text-sm text-indigo-100 leading-relaxed font-normal">
              {activeEra.description}
            </p>

            {isExpanded && (
              <div className="flex flex-col gap-3 animate-fade-in">
                
                {/* Advanced Physics Sub-narrative */}
                <p className="text-xs text-indigo-300/90 italic leading-relaxed border-l-2 border-indigo-500/40 pl-2">
                  {activeEra.expandedInfo}
                </p>

                {/* Chemical elements abundance (If applicable) */}
                {activeEra.elements.length > 0 && (
                  <div className="bg-black/20 p-2 rounded-xl border border-white/5 flex flex-col gap-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                      Atomic Yield (Abundances)
                    </p>
                    <div className="flex gap-2">
                      {activeEra.elements.map((el) => (
                        <div key={el.name} className="flex-1 flex flex-col text-center">
                          <span
                            className="text-xs font-bold"
                            style={{ color: getElementColor(el.name) }}
                          >
                            {el.percentage}%
                          </span>
                          <span className="text-[9px] text-white/50">{el.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Did You Know Bullet Facts */}
                <div className="flex flex-col gap-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Physics Insight
                  </p>
                  <ul className="flex flex-col gap-1">
                    {activeEra.facts.map((fact, idx) => (
                      <li key={idx} className="text-[10px] md:text-xs text-indigo-200/80 flex items-start gap-1">
                        <ChevronRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

        {/* 2.5 EARTH GEOLOGICAL EVOLUTION TICKER */}
        {activeEra.id === 11 && activeEra.geologicalMilestones && (
          <div className="absolute bottom-[105px] left-1/2 -translate-x-1/2 max-w-xl md:max-w-2xl w-full pointer-events-auto flex flex-col gap-2 bg-black/40 backdrop-blur-md px-5 py-3 rounded-2xl border border-indigo-500/20 shadow-lg select-none text-center">
            <p className="text-[9px] font-extrabold text-indigo-400 uppercase tracking-widest">
              Earth Geological & Biological Evolution Timeline
            </p>
            
            {/* Milestone steps bar */}
            <div className="flex justify-between items-center gap-1.5 mt-1 relative px-2">
              {/* Base grey line */}
              <div className="absolute left-0 right-0 h-[2px] bg-white/10 -z-10" />
              
              {/* Active filled line based on Earth scroll progress */}
              {(() => {
                const eraScroll = Math.max(0, Math.min(1.0, (scroll - 0.84) / 0.09));
                return (
                  <div 
                    className="absolute left-0 h-[2px] bg-indigo-500 -z-10 transition-all duration-150"
                    style={{ width: `${eraScroll * 100}%` }}
                  />
                );
              })()}

              {activeEra.geologicalMilestones.map((milestone, idx) => {
                const eraScroll = Math.max(0, Math.min(1.0, (scroll - 0.84) / 0.09));
                const isPast = eraScroll >= milestone.scrollFraction;
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                        isPast
                          ? "bg-indigo-500 border-indigo-400 scale-110 shadow-md shadow-indigo-500/50"
                          : "bg-black border-white/20 hover:border-white/50"
                      }`}
                      title={`${milestone.name} (${milestone.timeAgo})`}
                    />
                    <span className={`text-[8px] mt-1 font-semibold uppercase tracking-tighter ${
                      isPast ? "text-indigo-300 font-bold" : "text-white/30"
                    }`}>
                      {milestone.timeAgo}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Active milestone detailed card inside ticker */}
            {(() => {
              const eraScroll = Math.max(0, Math.min(1.0, (scroll - 0.84) / 0.09));
              // Find the milestone closest to our current scroll progress
              const currentMilestone = activeEra.geologicalMilestones.reduce((prev, curr) => 
                Math.abs(curr.scrollFraction - eraScroll) < Math.abs(prev.scrollFraction - eraScroll) ? curr : prev
              );
              return (
                <div className="mt-2 text-left bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-[10px] md:text-xs font-extrabold text-white uppercase tracking-wider">
                      {currentMilestone.name}
                    </h4>
                    <span className="text-[9px] font-bold text-indigo-400 font-mono">
                      {currentMilestone.timeAgo}
                    </span>
                  </div>
                  <p className="text-[9px] md:text-[10px] text-indigo-300/80 italic font-semibold mt-0.5">
                    “{currentMilestone.tagline}”
                  </p>
                  <p className="text-[9px] md:text-[10px] text-white/80 leading-relaxed mt-1">
                    {currentMilestone.description}
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        {/* 3. BOTTOM HUD (TIME DISPLAY & PHYSICS GAUGES) */}
        <footer className="w-full flex flex-col md:flex-row justify-between items-end gap-4 pointer-events-auto">
        
        {/* TIME BAR */}
        <div className="glass px-5 py-3 rounded-2xl border-white/5 shadow-lg w-full md:w-auto flex flex-col">
          <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-400">
            Current Cosmic Epoch
          </p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl md:text-4xl font-extrabold text-white font-mono tracking-tighter text-glow">
              {formattedTime.value}
            </span>
            <span className="text-sm md:text-lg font-bold text-indigo-300">
              {formattedTime.unit}
            </span>
          </div>
          <span className="text-[10px] text-white/40 mt-0.5">
            {formattedTime.full} since $t=0$
          </span>
        </div>

        {/* PHYSICS READOUTS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 w-full md:w-auto min-w-[50%] lg:min-w-[65%]">
          
          {/* Temperature Gauge */}
          <div className="glass px-3.5 py-2.5 rounded-xl border-white/5 shadow-md flex flex-col justify-between">
            <span className="text-[9px] uppercase font-bold text-indigo-400">
              Temperature $T$
            </span>
            <span className="text-xs md:text-sm font-extrabold text-white font-mono mt-1 text-glow truncate">
              {formattedTemp}
            </span>
            <span className="text-[9px] text-white/40 mt-0.5">
              Blackbody energy scale
            </span>
          </div>

          {/* Universe Diameter */}
          <div className="glass px-3.5 py-2.5 rounded-xl border-white/5 shadow-md flex flex-col justify-between">
            <span className="text-[9px] uppercase font-bold text-indigo-400">
              Horizon Size $D$
            </span>
            <span className="text-xs md:text-sm font-extrabold text-white font-mono mt-1 truncate">
              {formattedDiameter}
            </span>
            <span className="text-[9px] text-white/40 mt-0.5">
              Observable horizon diameter
            </span>
          </div>

          {/* Density */}
          <div className="glass px-3.5 py-2.5 rounded-xl border-white/5 shadow-md flex flex-col justify-between">
            <span className="text-[9px] uppercase font-bold text-indigo-400">
              Density $\rho$
            </span>
            <span className="text-xs md:text-sm font-extrabold text-white font-mono mt-1 truncate">
              {formattedDensity}
            </span>
            <span className="text-[9px] text-white/40 mt-0.5">
              Critical matter-energy density
            </span>
          </div>

          {/* Expansion Rate */}
          <div className="glass px-3.5 py-2.5 rounded-xl border-white/5 shadow-md flex flex-col justify-between">
            <span className="text-[9px] uppercase font-bold text-indigo-400">
              Expansion $H(t)$
            </span>
            <span className="text-xs md:text-sm font-extrabold text-white font-mono mt-1 truncate">
              {Math.round(hubbleRate).toLocaleString()} km/s/Mpc
            </span>
            <span className="text-[9px] text-white/40 mt-0.5">
              Hubble expansion constant
            </span>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
