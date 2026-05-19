"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCosmosStore } from "@/store/useCosmosStore";

// ==========================================
// 1. PLANCK ERA (Epoch 1)
// ==========================================
function PlanckEra() {
  const meshRef = useRef<THREE.Points>(null);
  
  // Create a sphere of mathematical noise particles
  const [positions, colors] = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 0.8 + Math.random() * 0.2;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Cybernetic violet blackbody palette
      col[i * 3] = 0.6 + Math.random() * 0.4; // Red
      col[i * 3 + 1] = 0.2 + Math.random() * 0.4; // Green
      col[i * 3 + 2] = 1.0; // Blue
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const positionsAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;

    // Displace points dynamically to simulate quantum foam fluctuations
    for (let i = 0; i < positionsAttr.count; i++) {
      const x = posOriginal[i * 3];
      const y = posOriginal[i * 3 + 1];
      const z = posOriginal[i * 3 + 2];

      const wave = Math.sin(x * 5 + time * 10) * Math.cos(y * 5 + time * 8) * 0.15;
      
      positionsAttr.setXYZ(
        i,
        x + x * wave,
        y + y * wave,
        z + z * wave
      );
    }
    positionsAttr.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.2;
  });

  const posOriginal = useMemo(() => new Float32Array(positions), [positions]);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// ==========================================
// 2. COSMIC INFLATION (Epoch 2)
// ==========================================
function InflationEra() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useCosmosStore((state) => state.scroll);
  
  // Calculate relative inflation scale factor
  const eraScroll = (scroll - 0.08) / 0.08;
  const inflationScale = Math.max(1, Math.exp(eraScroll * 4));

  const [positions] = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.1 + Math.random() * 1.5;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return [pos];
  }, []);

  return (
    <group ref={groupRef} scale={[inflationScale, inflationScale, inflationScale]}>
      {/* Expanding Grid representing spatial fabric stretching */}
      <gridHelper args={[30, 30, "#4f46e5", "#312e81"]} position={[0, -1, 0]}>
        <lineBasicMaterial attach="material" transparent opacity={0.3} />
      </gridHelper>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#818cf8" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

// ==========================================
// 3. QUARK-GLUON PLASMA (Epoch 3)
// ==========================================
function QuarkEpoch() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 4000;

  // Initialize random particle positions and velocities
  const [positions, colors, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Inside a sphere
      const r = Math.random() * 4;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Extreme thermal blackbody: violet, white-blue, magenta
      const rand = Math.random();
      if (rand < 0.4) {
        col[i * 3] = 0.5; col[i * 3 + 1] = 0.8; col[i * 3 + 2] = 1.0; // Hot Blue
      } else if (rand < 0.8) {
        col[i * 3] = 0.9; col[i * 3 + 1] = 0.2; col[i * 3 + 2] = 0.8; // Hot Magenta
      } else {
        col[i * 3] = 1.0; col[i * 3 + 1] = 1.0; col[i * 3 + 2] = 1.0; // Pure White-Hot
      }

      // Random speed vector
      vel[i * 3] = (Math.random() - 0.5) * 0.1;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    return [pos, col, vel];
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;

    // Simulate standard gas diffusion and bounce boundaries
    for (let i = 0; i < count; i++) {
      let x = positionsAttr.getX(i) + velocities[i * 3];
      let y = positionsAttr.getY(i) + velocities[i * 3 + 1];
      let z = positionsAttr.getZ(i) + velocities[i * 3 + 2];

      const r = Math.sqrt(x*x + y*y + z*z);
      if (r > 4) {
        // Bounce back towards the center
        velocities[i * 3] *= -1;
        velocities[i * 3 + 1] *= -1;
        velocities[i * 3 + 2] *= -1;
      }

      positionsAttr.setXYZ(i, x, y, z);
    }
    positionsAttr.needsUpdate = true;
    pointsRef.current.rotation.y += 0.005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.85} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// ==========================================
// 4. NUCLEOSYNTHESIS (Epoch 4)
// ==========================================
function Nucleosynthesis() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Nucleosynthesis: Proton-neutron fusion.
  // Render floating hydrogen (single blue sphere) and helium (4 connected spheres: 2 red, 2 blue)
  const nuclei = useMemo(() => {
    const items = [];
    const count = 40;
    
    for (let i = 0; i < count; i++) {
      const type = Math.random() > 0.6 ? "helium" : "hydrogen";
      const basePos = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      );
      
      const speed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
      );

      items.push({ id: i, type, basePos, speed });
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Drifting animation
    groupRef.current.children.forEach((child, index) => {
      const item = nuclei[index];
      if (item) {
        child.position.addScaledVector(item.speed, delta);
        
        // boundary clamp
        if (child.position.length() > 5) {
          child.position.setLength(4.9);
          item.speed.multiplyScalar(-1);
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {nuclei.map((n) => (
        <group key={n.id} position={n.basePos}>
          {n.type === "hydrogen" ? (
            // Hydrogen: 1 blue proton
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color="#3b82f6" />
            </mesh>
          ) : (
            // Helium: 4 overlapping spheres (2 red neutrons, 2 blue protons)
            <group scale={[0.8, 0.8, 0.8]}>
              <mesh position={[0.04, 0.04, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color="#ef4444" />
              </mesh>
              <mesh position={[-0.04, 0.04, 0.04]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color="#3b82f6" />
              </mesh>
              <mesh position={[0.04, -0.04, 0.04]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color="#3b82f6" />
              </mesh>
              <mesh position={[-0.04, -0.04, -0.04]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color="#ef4444" />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  );
}

// ==========================================
// 5. RECOMBINATION & CMB (Epoch 5)
// ==========================================
function Recombination() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Custom procedural texture for CMB splotches (red & blue anisotropy)
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ff5722"; // default orange-glow
      ctx.fillRect(0, 0, 512, 256);

      // Create random splotches representing CMB temperature fluctuations
      for (let i = 0; i < 300; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const r = 10 + Math.random() * 30;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        
        // Randomly assign red (hot) or blue (cold) anisotropy splotch
        if (Math.random() > 0.5) {
          grad.addColorStop(0, "rgba(59, 130, 246, 0.5)"); // blue
          grad.addColorStop(1, "rgba(59, 130, 246, 0)");
        } else {
          grad.addColorStop(0, "rgba(239, 68, 68, 0.5)"); // red
          grad.addColorStop(1, "rgba(239, 68, 68, 0)");
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.0, 64, 64]} />
        {/* Glow-blended CMB map */}
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>
      {/* Outer cooling corona */}
      <mesh>
        <sphereGeometry args={[2.05, 32, 32]} />
        <meshBasicMaterial color="#b45309" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

// ==========================================
// 6. COSMIC DARK AGES (Epoch 6)
// ==========================================
function DarkAges() {
  // Silent, cold gas wisps in absolute shadow
  const [positions] = useMemo(() => {
    const count = 1000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return [pos];
  }, []);

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        {/* Faint, barely visible dark-blue particles */}
        <pointsMaterial size={0.02} color="#1e1b4b" transparent opacity={0.3} />
      </points>
      {/* Faint centered wireframe showing dark matter potential wells */}
      <mesh>
        <sphereGeometry args={[2.5, 8, 8]} />
        <meshBasicMaterial color="#312e81" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

// ==========================================
// 7. FIRST STARS (Epoch 7)
// ==========================================
function FirstStars() {
  const starsRef = useRef<THREE.Group>(null);
  
  const starsData = useMemo(() => {
    const count = 15;
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6
        ),
        size: 0.1 + Math.random() * 0.15,
        ignitionTime: Math.random() * 5, // staggered glow
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!starsRef.current) return;
    const time = state.clock.getElapsedTime();

    starsRef.current.children.forEach((child, index) => {
      const data = starsData[index];
      if (data) {
        // Stars slowly pulsate and glow based on their ignition time
        const scale = data.size * (1.0 + 0.15 * Math.sin(time * 3 + data.ignitionTime));
        child.scale.set(scale, scale, scale);
      }
    });
  });

  return (
    <group ref={starsRef}>
      {starsData.map((star) => (
        <mesh key={star.id} position={star.pos}>
          <sphereGeometry args={[1, 16, 16]} />
          {/* Intense ultra-blue zero metallicity Pop III stellar glow */}
          <meshBasicMaterial color="#e0f2fe" />
          {/* Corona halo */}
          <mesh scale={[1.4, 1.4, 1.4]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} side={THREE.BackSide} />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}

// ==========================================
// 8. GALAXY FORMATION (Epoch 8)
// ==========================================
function GalaxyFormation() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;

  // Hierarchical N-body: Particles congregate around 3 major galactic centroids
  const centroids = useMemo(() => [
    new THREE.Vector3(-1.5, 0.5, 0),
    new THREE.Vector3(1.0, -0.5, 0.5),
    new THREE.Vector3(0, 1.0, -1.0)
  ], []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Pick a centroid
      const centroid = centroids[Math.floor(Math.random() * centroids.length)];
      
      // Random offset with high concentration near centers (exponential decay)
      const r = -Math.log(Math.random() + 0.001) * 0.8;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = centroid.x + r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = centroid.y + r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = centroid.z + r * Math.cos(phi);

      // Colors mapping from core (dense white-blue) to outskirts (reddish gas)
      const coreFraction = Math.min(1.0, r / 2.0);
      col[i * 3] = 0.2 + (1.0 - coreFraction) * 0.8;      // Red
      col[i * 3 + 1] = 0.4 + (1.0 - coreFraction) * 0.6;  // Green
      col[i * 3 + 2] = 1.0;                               // Blue
    }
    return [pos, col];
  }, [centroids]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.003;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// ==========================================
// 9. STELLAR EVOLUTION & COSMIC NOON (Epoch 9)
// ==========================================
function StellarEvolution() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 6000;

  // Double spiral arm density wave simulation
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Pick one of the two arms (0 or pi offset)
      const armOffset = Math.random() > 0.5 ? 0 : Math.PI;
      
      const r = Math.random() * 4.5;
      // Logarithmic spiral math: theta = log(r)/b
      const theta = (1 / 0.5) * Math.log(r + 0.1) + armOffset;

      // Dispersal to make arms fuzzy
      const dispersion = (Math.random() - 0.5) * 0.45 * (r + 0.5);
      const angle = theta + dispersion;

      pos[i * 3] = r * Math.cos(angle);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.25 * (5 - r); // thick disk near center
      pos[i * 3 + 2] = r * Math.sin(angle);

      // Diverse stellar colors: Blue (young massive), Yellow (m-class suns), Red (old giants)
      const colorVal = Math.random();
      if (colorVal < 0.25) {
        col[i * 3] = 0.5; col[i * 3 + 1] = 0.7; col[i * 3 + 2] = 1.0; // Blue
      } else if (colorVal < 0.7) {
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.9; col[i * 3 + 2] = 0.5; // Yellow-white
      } else {
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.4; col[i * 3 + 2] = 0.3; // Red
      }
    }
    return [pos, col];
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.004;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors transparent opacity={0.75} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// ==========================================
// 10. SOLAR SYSTEM (Epoch 10)
// ==========================================
function SolarSystem() {
  const diskRef = useRef<THREE.Points>(null);
  const count = 3000;

  // spinning Keplerian protoplanetary disk
  const [positions, colors, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count); // orbital speeds

    for (let i = 0; i < count; i++) {
      const r = 0.6 + Math.random() * 3.4;
      const angle = Math.random() * 2 * Math.PI;

      pos[i * 3] = r * Math.cos(angle);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.05; // extremely flat disk
      pos[i * 3 + 2] = r * Math.sin(angle);

      // Keplerian speed formula: v is proportional to r^(-0.5)
      vel[i] = 0.03 * Math.pow(r, -0.5);

      // Protoplanetary disk thermal gradient (hot inner orange dust, cold outer grey ice)
      const tempFraction = (r - 0.6) / 3.4;
      col[i * 3] = 1.0 - tempFraction * 0.6; // Red
      col[i * 3 + 1] = 0.4 + (1 - tempFraction) * 0.3; // Green
      col[i * 3 + 2] = 0.1 + tempFraction * 0.5; // Blue
    }
    return [pos, col, vel];
  }, []);

  useFrame(() => {
    if (!diskRef.current) return;
    const positionsAttr = diskRef.current.geometry.attributes.position as THREE.BufferAttribute;

    // Rotate particles at Keplerian speeds
    for (let i = 0; i < count; i++) {
      let x = positionsAttr.getX(i);
      let z = positionsAttr.getZ(i);
      
      const r = Math.sqrt(x*x + z*z);
      let angle = Math.atan2(z, x) + velocities[i];

      positionsAttr.setX(i, r * Math.cos(angle));
      positionsAttr.setZ(i, r * Math.sin(angle));
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <group>
      {/* Central forming Sun */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      {/* Sun glow halo */}
      <mesh scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.25} side={THREE.BackSide} />
      </mesh>
      {/* Dust accretion disk */}
      <points ref={diskRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.02} vertexColors transparent opacity={0.8} />
      </points>
    </group>
  );
}

// ==========================================
// 0. THE BIG BANG (Epoch 0)
// ==========================================
function BigBangEra() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useCosmosStore((state) => state.scroll);
  
  // Normalized progress inside the Big Bang epoch (0 to 0.05)
  const eraScroll = Math.min(1.0, Math.max(0.0, scroll / 0.05));
  
  // Exponential expansion of the singularity (size goes from 0.02 to 35)
  const scale = 0.02 + Math.pow(eraScroll, 6) * 35;
  
  // Fade out from blinding white-yellow to deep indigo
  const color = useMemo(() => {
    const c = new THREE.Color("#ffffff");
    if (eraScroll > 0.5) {
      c.lerp(new THREE.Color("#4f46e5"), (eraScroll - 0.5) / 0.5);
    }
    return c;
  }, [eraScroll]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={1.0 - eraScroll * 0.4} />
      </mesh>
      
      {/* Core singularity point light */}
      <pointLight position={[0, 0, 0]} intensity={30 * (1 - eraScroll)} color="#ffffff" />
    </group>
  );
}

// ==========================================
// 11. EARTH ERA (Epoch 11)
// ==========================================
function EarthEra() {
  const earthRef = useRef<THREE.Group>(null);
  const scroll = useCosmosStore((state) => state.scroll);

  // Map scroll inside Earth era (0.84 to 0.93) to geological transitions
  const eraScroll = Math.max(0, Math.min(1.0, (scroll - 0.84) / 0.09));

  // Determine surface color blends across the 7 geological epochs
  const surfaceColor = useMemo(() => {
    if (eraScroll < 0.2) {
      // 1. Hadean Magma (0.0 to 0.2): Deep molten magma red-orange
      return new THREE.Color("#ef4444").lerp(new THREE.Color("#991b1b"), eraScroll / 0.2);
    } else if (eraScroll < 0.4) {
      // 2. Archean Oceans (0.2 to 0.4): Cooling iron grey and steel blue oceans
      const t = (eraScroll - 0.2) / 0.2;
      return new THREE.Color("#991b1b").lerp(new THREE.Color("#1e3a8a"), t);
    } else if (eraScroll < 0.6) {
      // 3. Great Oxygenation Event (0.4 to 0.6): Oxygen cyan atmospheric haze
      const t = (eraScroll - 0.4) / 0.2;
      return new THREE.Color("#1e3a8a").lerp(new THREE.Color("#0891b2"), t);
    } else if (eraScroll < 0.75) {
      // 4. Cryogenian Snowball Earth (0.6 to 0.75): Frozen planet white glacier reflection
      const t = (eraScroll - 0.6) / 0.15;
      return new THREE.Color("#0891b2").lerp(new THREE.Color("#f8fafc"), t);
    } else if (eraScroll < 0.9) {
      // 5. Cambrian Explosion (0.75 to 0.90): Green plants appearing on continental drift
      const t = (eraScroll - 0.75) / 0.15;
      return new THREE.Color("#f8fafc").lerp(new THREE.Color("#047857"), t);
    } else if (eraScroll < 0.98) {
      // 6. Dinosaur Extinction Asteroid Impact (0.90 to 0.98): Soot charcoal grey and red embers
      const t = (eraScroll - 0.9) / 0.08;
      return new THREE.Color("#047857").lerp(new THREE.Color("#4b5563"), t);
    } else {
      // 7. Anthropocene Present Day (0.98 to 1.0): Ocean blue with rich green continents
      const t = (eraScroll - 0.98) / 0.02;
      return new THREE.Color("#4b5563").lerp(new THREE.Color("#10b981"), t);
    }
  }, [eraScroll]);

  // Atmosphere halo color shifts depending on the active gas epoch
  const atmosphereColor = useMemo(() => {
    if (eraScroll < 0.4) return "#f97316"; // Volcanic orange atmosphere
    if (eraScroll < 0.6) return "#06b6d4"; // Cyan oxygen haze
    if (eraScroll < 0.75) return "#f1f5f9"; // Snowball reflective white
    return "#3b82f6"; // Modern ocean blue
  }, [eraScroll]);

  useFrame((state) => {
    if (earthRef.current) {
      // Spin planet Earth
      earthRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={earthRef}>
      {/* 3D Earth Globe Sphere */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color={surfaceColor}
          roughness={eraScroll >= 0.6 && eraScroll < 0.75 ? 0.3 : 0.8} // icy reflections in Snowball
          metalness={0.2}
          flatShading
        />
      </mesh>
      
      {/* Atmospheric glowing corona (fades in after crust cools) */}
      {eraScroll >= 0.15 && (
        <mesh scale={[1.06, 1.06, 1.06]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial color={atmosphereColor} transparent opacity={0.15} side={THREE.BackSide} />
        </mesh>
      )}

      {/* Orbiting Moon (Theia ejecta accretion starts at Hadean) */}
      {eraScroll >= 0.1 && (
        <mesh position={[2.2, 0.2, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.9} />
        </mesh>
      )}
    </group>
  );
}

// ==========================================
// 12. PRESENT DAY & ZOOM-OUT FINALE (Epoch 12)
// ==========================================
function NowEra() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useCosmosStore((state) => state.scroll);

  // Map scroll inside Now era (0.93 to 1.0) to zoom properties
  const eraScroll = Math.max(0, Math.min(1.0, (scroll - 0.93) / 0.07));

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  // Calculate nested fading scaling rings
  // As we pull back, the Earth shrink, solar system appears, then whole galaxy, then CMB sphere.
  return (
    <group ref={groupRef}>
      {/* 1. Earth at the absolute core (shrinks as we zoom out) */}
      <group scale={[Math.max(0.001, 1 - eraScroll * 1.5), Math.max(0.001, 1 - eraScroll * 1.5), Math.max(0.001, 1 - eraScroll * 1.5)]}>
        <EarthEra />
      </group>

      {/* 2. Concentric ring shells representing our Solar System orbits */}
      {eraScroll > 0.2 && (
        <group scale={[eraScroll * 1.5, eraScroll * 1.5, eraScroll * 1.5]}>
          {/* Orbit circles */}
          {[1, 1.8, 2.6, 3.5].map((radius, idx) => (
            <mesh key={idx} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius, radius + 0.02, 64]} />
              <meshBasicMaterial color="#475569" transparent opacity={0.4 * eraScroll} />
            </mesh>
          ))}
          {/* Centered Sun dot */}
          <mesh>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#fbbf24" transparent opacity={eraScroll} />
          </mesh>
        </group>
      )}

      {/* 3. Milky Way galaxy model appearing at extreme pullback */}
      {eraScroll > 0.5 && (
        <group scale={[eraScroll * 3, eraScroll * 3, eraScroll * 3]}>
          <StellarEvolution />
        </group>
      )}

      {/* 4. Outer Boundary: The entire observable universe CMB sphere */}
      {eraScroll > 0.75 && (
        <group scale={[4.0, 4.0, 4.0]}>
          <Recombination />
        </group>
      )}
    </group>
  );
}

// ==========================================
// MAIN ERA CONTAINER / VISUAL SWITCHBOARD
// ==========================================
export default function ErasContainer() {
  const activeEraId = useCosmosStore((state) => state.activeEra.id);

  // LOD strategy: only mount the active era visual mesh inside the canvas to keep rendering light.
  return (
    <group>
      {activeEraId === 0 && <BigBangEra />}
      {activeEraId === 1 && <PlanckEra />}
      {activeEraId === 2 && <InflationEra />}
      {activeEraId === 3 && <QuarkEpoch />}
      {activeEraId === 4 && <Nucleosynthesis />}
      {activeEraId === 5 && <Recombination />}
      {activeEraId === 6 && <DarkAges />}
      {activeEraId === 7 && <FirstStars />}
      {activeEraId === 8 && <GalaxyFormation />}
      {activeEraId === 9 && <StellarEvolution />}
      {activeEraId === 10 && <SolarSystem />}
      {activeEraId === 11 && <EarthEra />}
      {activeEraId === 12 && <NowEra />}
    </group>
  );
}
