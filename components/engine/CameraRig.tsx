"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCosmosStore } from "@/store/useCosmosStore";

// Camera positions and target lookAts for each of the 13 eras
const CAMERA_KEYFRAMES = [
  // 0: Big Bang Singularity - Singularity coordinate (extreme close zoom-in on origin)
  { pos: new THREE.Vector3(0, 0, 0.05), target: new THREE.Vector3(0, 0, 0) },
  // 1: Planck Era - Extreme microscopic macro zoom into mathematical foam
  { pos: new THREE.Vector3(0, 0, 1.2), target: new THREE.Vector3(0, 0, 0) },
  // 2: Inflation - Exponential zoom-out
  { pos: new THREE.Vector3(0, 0, 25), target: new THREE.Vector3(0, 0, 0) },
  // 3: Quark Epoch - Swimming inside dense soup of quarks
  { pos: new THREE.Vector3(0, 3, 8), target: new THREE.Vector3(0, 0, 0) },
  // 4: Nucleosynthesis - Close up on particle fusion events
  { pos: new THREE.Vector3(2, 1, 4), target: new THREE.Vector3(0, 0.5, 0) },
  // 5: Recombination - Orbiting the cooling sphere
  { pos: new THREE.Vector3(0, 0, 6), target: new THREE.Vector3(0, 0, 0) },
  // 6: Dark Ages - Drifting silently through empty gas fields
  { pos: new THREE.Vector3(-1, 2, 15), target: new THREE.Vector3(0, 0, -2) },
  // 7: First Stars - Focusing on distant igniting stellar nodes
  { pos: new THREE.Vector3(4, -1, 5), target: new THREE.Vector3(0, 0, 0) },
  // 8: Galaxy Formation - Panning over massive gravitational clusters
  { pos: new THREE.Vector3(5, 5, 8), target: new THREE.Vector3(0, 0, 0) },
  // 9: Stellar Evolution - Panning down into a beautiful spiral arm
  { pos: new THREE.Vector3(0, 6, 8), target: new THREE.Vector3(0, 0, 0) },
  // 10: Solar System - Tilted angle looking down at planetary disk
  { pos: new THREE.Vector3(0, 5, 7), target: new THREE.Vector3(0, 0.2, 0) },
  // 11: Earth - Rotating globe view
  { pos: new THREE.Vector3(0, 0, 3.2), target: new THREE.Vector3(0, 0, 0) },
  // 12: Now - Epic zoom out to see the entire CMB universe sphere
  { pos: new THREE.Vector3(0, 0, 30), target: new THREE.Vector3(0, 0, 0) },
];

export default function CameraRig() {
  const { camera } = useThree();
  const scroll = useCosmosStore((state) => state.scroll);
  const activeEra = useCosmosStore((state) => state.activeEra);
  
  // Track target values to smoothly lerp towards
  const currentPos = useRef(new THREE.Vector3().copy(CAMERA_KEYFRAMES[0].pos));
  const currentTarget = useRef(new THREE.Vector3().copy(CAMERA_KEYFRAMES[0].target));

  // Reset target values on start
  useEffect(() => {
    camera.position.copy(CAMERA_KEYFRAMES[0].pos);
    camera.lookAt(CAMERA_KEYFRAMES[0].target);
  }, [camera]);

  useFrame((state, delta) => {
    // 1. Calculate camera keyframe interpolation based on overall scroll (0 to 1)
    const totalFrames = CAMERA_KEYFRAMES.length;
    const rawIndex = scroll * (totalFrames - 1);
    const index = Math.min(totalFrames - 2, Math.floor(rawIndex));
    const fraction = rawIndex - index;

    // Retrieve active keyframes
    const kfStart = CAMERA_KEYFRAMES[index];
    const kfEnd = CAMERA_KEYFRAMES[index + 1];

    if (kfStart && kfEnd) {
      // Interpolate position and target based on scroll position within the current interval
      const targetPos = new THREE.Vector3().lerpVectors(kfStart.pos, kfEnd.pos, fraction);
      const targetLook = new THREE.Vector3().lerpVectors(kfStart.target, kfEnd.target, fraction);

      // Add standard orbit rotation based on clock time to make it feel alive!
      const time = state.clock.getElapsedTime();
      
      // We apply subtle orbital motion, depending on the active era
      if (activeEra.id === 5 || activeEra.id === 11 || activeEra.id === 12) {
        // Slow orbit for planet, CMB, and final zoom out
        const radius = targetPos.length();
        const angle = time * 0.05;
        targetPos.x = radius * Math.sin(angle) * Math.cos(0.2);
        targetPos.z = radius * Math.cos(angle) * Math.cos(0.2);
      } else if (activeEra.id === 9 || activeEra.id === 10) {
        // Orbit for rotating galaxies and protoplanetary disk
        const radius = Math.sqrt(targetPos.x * targetPos.x + targetPos.z * targetPos.z) || 5;
        const angle = time * 0.08;
        targetPos.x = radius * Math.sin(angle);
        targetPos.z = radius * Math.cos(angle);
      } else {
        // Subtle micro-float for abstract eras
        targetPos.x += Math.sin(time * 0.2) * 0.05;
        targetPos.y += Math.cos(time * 0.3) * 0.05;
      }

      // Smoothly interpolate current camera properties (damping / lerping)
      // High speed factor (0.08) for responsiveness, smoothed out for scroll momentum
      currentPos.current.lerp(targetPos, 0.05);
      currentTarget.current.lerp(targetLook, 0.05);

      // Apply to Three.js camera
      camera.position.copy(currentPos.current);
      camera.lookAt(currentTarget.current);
    }
  });

  return null;
}
