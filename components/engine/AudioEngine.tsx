"use client";

import { useEffect, useRef } from "react";
import { useCosmosStore } from "@/store/useCosmosStore";

export default function AudioEngine() {
  const isStarted = useCosmosStore((state) => state.isStarted);
  const isMuted = useCosmosStore((state) => state.isMuted);
  const temperature = useCosmosStore((state) => state.temperature);
  const activeEraId = useCosmosStore((state) => state.activeEra.id);
  const scroll = useCosmosStore((state) => state.scroll);

  // References to Tone.js objects
  const synthRef = useRef<any>(null);
  const chimeSynthRef = useRef<any>(null);
  const noiseRef = useRef<any>(null);
  const filterRef = useRef<any>(null);
  const chordRef = useRef<any[]>([]);
  const isInitialized = useRef(false);

  // Handle initialization and setup (only client-side once started)
  useEffect(() => {
    if (!isStarted || isInitialized.current) return;

    let active = true;

    const setupAudio = async () => {
      try {
        const Tone = await import("tone");

        // 1. Start Audio Context
        await Tone.start();
        
        // 2. Main Ambient cooling oscillator (drone)
        const filter = new Tone.Filter({
          type: "lowpass",
          frequency: 300,
          Q: 1,
        }).toDestination();
        filterRef.current = filter;

        const droneSynth = new Tone.PolySynth(Tone.Synth, {
          oscillator: {
            type: "sine",
          },
          envelope: {
            attack: 2,
            decay: 2,
            sustain: 0.8,
            release: 2,
          },
        }).connect(filter);
        
        // Lower volume for comfortable background
        droneSynth.volume.value = -12;
        synthRef.current = droneSynth;

        // Trigger base note for Planck Era
        droneSynth.triggerAttack(["E2", "B2"]);

        // 3. Fusion / Star Ignition Chime Synth (High frequency bells)
        const chimeSynth = new Tone.MonoSynth({
          oscillator: { type: "sine" },
          filter: { Q: 2, type: "lowpass", frequency: 2000 },
          envelope: { attack: 0.01, decay: 0.4, sustain: 0.0, release: 0.5 },
          filterEnvelope: { attack: 0.01, decay: 0.2, baseFrequency: 800, octaves: 2 },
        }).toDestination();
        chimeSynth.volume.value = -16;
        chimeSynthRef.current = chimeSynth;

        // 4. White noise generator for roiling plasma epoch
        const noise = new Tone.Noise("pink").connect(
          new Tone.Filter(800, "bandpass").toDestination()
        );
        noise.volume.value = -99; // start inaudible
        noise.start();
        noiseRef.current = noise;

        // 5. CMB Acoustic Peak Oscillation Harmonics (Chord)
        // Sonified peaks measured in the CMB power spectrum (shifted to audible range)
        const cmbChord = [73.4, 110, 146.8, 220].map((freq) => {
          const osc = new Tone.Oscillator(freq, "triangle").toDestination();
          osc.volume.value = -99; // start muted
          osc.start();
          return osc;
        });
        chordRef.current = cmbChord;

        isInitialized.current = true;
      } catch (err) {
        console.error("Failed to initialize Tone.js: ", err);
      }
    };

    setupAudio();

    return () => {
      active = false;
      // Clean up Tone audio sources on unmount
      if (synthRef.current) synthRef.current.dispose();
      if (chimeSynthRef.current) chimeSynthRef.current.dispose();
      if (noiseRef.current) noiseRef.current.dispose();
      if (filterRef.current) filterRef.current.dispose();
      chordRef.current.forEach((osc) => osc.dispose());
    };
  }, [isStarted]);

  // Handle Mute & Unmute volume modifications
  useEffect(() => {
    const handleMuting = async () => {
      if (!isInitialized.current) return;
      const Tone = await import("tone");
      
      // Tone.Destination represents master volume
      Tone.Destination.mute = isMuted;
    };
    handleMuting();
  }, [isMuted]);

// Helper to map values linearly
function mapLinear(value: number, x1: number, y1: number, x2: number, y2: number): number {
  return x2 + ((value - x1) * (y2 - x2)) / (y1 - x1);
}

  // Dynamically map cosmology properties to sound variables on state updates
  useEffect(() => {
    if (!isInitialized.current) return;

    const updateSynthParameters = async () => {
      // 1. DYNAMIC COLD DRONE: Pitch goes down as temperature falls
      // Log10 of temp spans ~ 32 (Planck) to 0.4 (Now)
      const logTemp = Math.max(0.4, Math.min(32, Math.log10(temperature)));
      
      // Map log temperature to base filter cutoff (higher temp = brighter, lower = warmer)
      if (filterRef.current) {
        const filterCutoff = mapLinear(logTemp, 0.4, 32, 80, 2000);
        filterRef.current.frequency.rampTo(filterCutoff, 0.1);
      }

      // Map temperature to drone pitch range (detune detuning)
      if (synthRef.current) {
        synthRef.current.set({
          oscillator: { detune: mapLinear(logTemp, 0.4, 32, -300, 300) },
        });
      }

      // 2. ROILING PLASMA NOISE: Only audible in Era 3 (Quark Epoch)
      if (noiseRef.current) {
        if (activeEraId === 3) {
          noiseRef.current.volume.rampTo(-18, 0.5); // make it crackle
        } else {
          noiseRef.current.volume.rampTo(-99, 0.5); // mute it
        }
      }

      // 3. FUSION NOTES: Trigger randomized chime bursts in Era 4 (Nucleosynthesis)
      if (activeEraId === 4 && chimeSynthRef.current) {
        // Trigger a chime with a probability to simulate stochastic fusion events
        if (Math.random() < 0.15) {
          const notes = ["C5", "D5", "G5", "A5", "C6"];
          const randomNote = notes[Math.floor(Math.random() * notes.length)];
          chimeSynthRef.current.triggerAttackRelease(randomNote, "0.1");
        }
      }

      // 4. STAR IGNITIONS: Spark chimes in Era 7 (First Stars)
      if (activeEraId === 7 && chimeSynthRef.current) {
        if (Math.random() < 0.08) {
          const starChimes = ["E5", "A5", "B5", "E6", "F#6"];
          const randomNote = starChimes[Math.floor(Math.random() * starChimes.length)];
          chimeSynthRef.current.triggerAttackRelease(randomNote, "0.2");
        }
      }

      // 5. CMB POWER SPEC: Fades in gradually during Recombination (Era 5) & Present Day (Era 12)
      chordRef.current.forEach((osc, idx) => {
        if (activeEraId === 5 || activeEraId === 12) {
          // Fade in CMB acoustic peaks
          osc.volume.rampTo(-24 - idx * 2, 0.5);
        } else {
          // Fade out otherwise
          osc.volume.rampTo(-99, 0.5);
        }
      });
    };

    updateSynthParameters();
  }, [temperature, activeEraId, scroll]);

  return null;
}
