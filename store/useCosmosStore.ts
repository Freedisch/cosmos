import { create } from "zustand";
import { getCosmicStateAtScroll, ERAS, Era } from "@/physics/timeline";

interface CosmosState {
  // Timeline State
  scroll: number;
  time: number;
  scaleFactor: number;
  temperature: number;
  density: number;
  diameter: number;
  activeEra: Era;

  // Settings & App Control
  isStarted: boolean;
  isMuted: boolean;
  quality: "low" | "medium" | "high";

  // Actions
  setScroll: (scroll: number) => void;
  setMuted: (muted: boolean) => void;
  setQuality: (quality: "low" | "medium" | "high") => void;
  startApp: () => void;
}

const initialCosmicState = getCosmicStateAtScroll(0);

export const useCosmosStore = create<CosmosState>((set) => ({
  // Initial states
  scroll: 0,
  time: initialCosmicState.time,
  scaleFactor: initialCosmicState.scaleFactor,
  temperature: initialCosmicState.temperature,
  density: initialCosmicState.density,
  diameter: initialCosmicState.diameter,
  activeEra: initialCosmicState.activeEra,

  isStarted: false,
  isMuted: false,
  quality: "medium", // Default quality

  // Set scroll progress and automatically re-calculate all physics properties
  setScroll: (s: number) => {
    const clampedScroll = Math.min(1.0, Math.max(0.0, s));
    const physics = getCosmicStateAtScroll(clampedScroll);
    
    set({
      scroll: clampedScroll,
      time: physics.time,
      scaleFactor: physics.scaleFactor,
      temperature: physics.temperature,
      density: physics.density,
      diameter: physics.diameter,
      activeEra: physics.activeEra,
    });
  },

  setMuted: (muted: boolean) => set({ isMuted: muted }),
  setQuality: (quality: "low" | "medium" | "high") => set({ quality }),
  startApp: () => set({ isStarted: true }),
}));
