"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useCosmosStore } from "@/store/useCosmosStore";
import CameraRig from "./CameraRig";
import ErasContainer from "../eras/ErasContainer";

export default function CosmosCanvas() {
  const quality = useCosmosStore((state) => state.quality);
  const isStarted = useCosmosStore((state) => state.isStarted);

  // Set device pixel ratio and star count based on quality settings
  const dpr = quality === "low" ? 1 : quality === "medium" ? [1, 1.5] : [1, 2];
  const starCount = quality === "low" ? 1000 : quality === "medium" ? 3000 : 6000;

  if (!isStarted) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-[#020206] z-0 overflow-hidden pointer-events-none">
      <Canvas
        gl={{
          antialias: quality !== "low",
          powerPreference: "high-performance",
          alpha: false,
          depth: true,
          stencil: false,
        }}
        dpr={dpr as any}
        camera={{ fov: 60, near: 0.1, far: 2000, position: [0, 0, 1.2] }}
      >
        {/* Deep space solid black background inside Three */}
        <color attach="background" args={["#020206"]} />

        {/* Global cosmic lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#c7d2fe" />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#818cf8" />

        {/* Persistent background starry web */}
        <Stars
          radius={300}
          depth={60}
          count={starCount}
          factor={7}
          saturation={0.5}
          fade
          speed={0.8}
        />

        {/* Dynamic scroll-driven Camera */}
        <CameraRig />

        {/* Eras Visual Switcher */}
        <ErasContainer />
      </Canvas>
    </div>
  );
}
