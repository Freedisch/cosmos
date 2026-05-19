"use client";

import { useCosmosStore } from "@/store/useCosmosStore";
import { Sparkles, Compass, Radio, ShieldCheck } from "lucide-react";

export default function IntroOverlay() {
  const isStarted = useCosmosStore((state) => state.isStarted);
  const startApp = useCosmosStore((state) => state.startApp);

  if (isStarted) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-[#020206] flex items-center justify-center p-4 z-50 overflow-hidden font-sans">
      
      {/* Animated subtle background glowing nebula */}
      <div className="absolute w-[40vw] h-[40vw] rounded-full bg-indigo-600/10 blur-[120px] top-1/4 left-1/4 animate-pulse" />
      <div className="absolute w-[35vw] h-[35vw] rounded-full bg-purple-600/10 blur-[120px] bottom-1/4 right-1/4 animate-pulse" />

      {/* Main glass card container */}
      <div className="glass glass-glow max-w-2xl w-full p-6 md:p-8 rounded-[36px] border-indigo-500/20 shadow-2xl text-center flex flex-col gap-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-[10px] md:text-xs tracking-widest text-indigo-400 font-extrabold uppercase">
              Interactive Cosmological Simulation
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-widest uppercase text-white text-gradient">
            Cosmos
          </h1>
          <p className="text-xs md:text-sm font-semibold italic text-indigo-200 mt-2">
            “You are here. This is how you got here.”
          </p>
        </div>

        {/* Short description */}
        <p className="text-xs md:text-sm text-indigo-100/90 leading-relaxed max-w-lg mx-auto">
          Embark on a scroll-driven journey spanning **13.8 billion years** of cosmic evolution—from the Planck Epoch quantum foam to the modern observable universe.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-left">
          
          {/* Feature 1 */}
          <div className="bg-white/5 border border-white/5 p-3 rounded-2xl flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-indigo-300">
              <Compass className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Logarithmic Timeline
              </h3>
            </div>
            <p className="text-[10px] text-indigo-200/75 leading-relaxed">
              Piecewise log scale maps early microseconds and late billions of years into equal scroll real estate.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/5 border border-white/5 p-3 rounded-2xl flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-indigo-300">
              <Sparkles className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Real Physics Engine
              </h3>
            </div>
            <p className="text-[10px] text-indigo-200/75 leading-relaxed">
              Friedmann solvers and thermodynamics equations drive expansion sizes, density, and blackbody colors.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/5 border border-white/5 p-3 rounded-2xl flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-indigo-300">
              <Radio className="w-4 h-4 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Tone.js Sonification
              </h3>
            </div>
            <p className="text-[10px] text-indigo-200/75 leading-relaxed">
              Evolving ambient synthesizers map temperature to pitch, adding cosmic noise and stellar ignition chimes.
            </p>
          </div>

        </div>

        {/* Start Button */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <button
            onClick={startApp}
            className="pointer-events-auto bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-extrabold text-xs md:text-sm px-8 py-3.5 rounded-full tracking-widest uppercase shadow-lg shadow-indigo-600/35 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all glass-glow border border-indigo-400/30"
          >
            Enter the Cosmos
          </button>
          
          <div className="flex items-center gap-1.5 text-[9px] text-indigo-300/70">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Clicking unlocks synthesizer audio layers in your browser.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
