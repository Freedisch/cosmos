# 🌌 COSMOS — A Visual Simulation of the Universe

> *You are here. This is how you got here.*

COSMOS is a premium, browser-based, scroll-driven WebGL simulation that takes the observer on an interactive journey through **13.8 billion years** of cosmic history — from the initial Planck-time quantum fluctuation to the modern epoch. Grounded in real physics, COSMOS bridges cosmology, WebGL shader design, and procedural sound synthesis into a unified sensory experience.

---

## 🚀 Key Features

*   **Logarithmic-Linear Cosmic Timeline**: A custom piecewise timeline engine translating a scroll posture smoothly from $t = 0$ (the Big Bang singularity) through radiation, matter, and dark energy dominated epochs.
*   **Real Cosmology Engine**: Solves the Friedmann cosmological equations in real-time, yielding dynamical expansion factors ($a(t)$), temperature ($T$), particle density ($\rho$), and horizon scales ($d_H$).
*   **Procedural Blackbody Redshifting**: Features a real-time GLSL/JS blackbody radiation spectrum converter based on the Tanner Helland algorithm, shifting temperatures dynamically according to the cosmological redshift factor $T_{\text{observed}} = T_{\text{emitted}} \times a(t)$.
*   **13 Epochs of 3D WebGL Visualization**: Leverages React Three Fiber (R3F) and Three.js to render custom particle clouds, plasma systems, cosmic microwave backgrounds, stellar accretion disks, and planetary structures.
*   **Geological & Biological Evolution of Earth**: Traces the planetary transformations of our home world across 7 specific milestones, morphing the Earth mesh through a fiery molten magma phase, cyan oxygenation haze, Cryogenian "snowball" glaciation, continental green lands, and dark-side civilization night lights.
*   **Dynamic Ambient Synthesizer**: Uses Tone.js to synthesize a custom soundscape mapped to physical cosmology state parameters, including quark-gluon plasma static, nucleosynthesis chimes, stellar fusion drones, and CMB acoustic peak chords.
*   **Glassmorphic Scientific HUD**: A sleek dashboard reporting live physical parameters matching the scroll position, coupled with a horizontal **Earth Milestone Ticker** that animates detailed geological context.

---

## 🕰️ The 13 Cosmic Eras

| Era | Epoch | Time Frame | Physical Characteristics & Visuals |
| :--- | :--- | :--- | :--- |
| **0** | **The Big Bang Singularity** | $t = 0$ to $10^{-45}\text{ s}$ | Absolute singularity. Visualized as an expanding hyper-dense core flash. |
| **1** | **Planck Epoch** | $10^{-43}\text{ s}$ | Core quantum fluctuations, grand unified scale. Quantum noise visual. |
| **2** | **Inflationary Epoch** | $10^{-36}\text{ s}$ | Exponential vacuum expansion, stretching fluctuations. Rapid expansion grid. |
| **3** | **Quark Epoch & Plasma** | $10^{-12}\text{ s}$ | Quark-gluon soup, ultra-hot high-density plasma. Liquid light and heat haze. |
| **4** | **Big Bang Nucleosynthesis** | $10\text{ s}$ | Fusion of light elements (H, He, Li). Glowing nuclear clusters and fusion chimes. |
| **5** | **Recombination & CMB** | $380,000\text{ yr}$ | First light travels freely. Rendered as a cosmic microwave background thermal noise shell. |
| **6** | **Cosmic Dark Ages** | $10\text{ Myr}$ | Cold, dark expansion. Gravitational clustering of primordial matter. Dim purple dust. |
| **7** | **Reionization & First Stars** | $100\text{ Myr}$ | Ignition of Population III stars. Golden stellar nuclear fusion. |
| **8** | **Galaxy Formation** | $1\text{ Gyr}$ | Accretion of early protogalaxies. Spiraling stellar particle structures. |
| **9** | **Acceleration Epoch** | $9\text{ Gyr}$ | Dark energy dominates; expansion speeds up. Spacial grid stretching and blue shifts. |
| **10** | **Solar System Formation** | $9.2\text{ Gyr}$ | Protoplanetary dust disk accretion. Hot glowing particulate rings. |
| **11** | **Earth's Deep History** | $9.3\text{ Gyr} - \text{Present}$ | Molten rock $\to$ cyan atmosphere $\to$ snowball glaciation $\to$ green continents. |
| **12** | **The Present Moment** | $13.8\text{ Gyr}$ | Human civilization, light networks, and space telescopes. Glowing modern globe. |

---

## 🛠️ Architecture & Codebase Layout

```filepath
├── app/
│   ├── layout.tsx         # Next.js App Router root layout & SEO metadata
│   └── page.tsx           # Page structure, scroll listener, and HUD/Canvas wrappers
├── components/
│   ├── engine/
│   │   ├── AudioEngine.tsx   # SSR-safe modular synthesizer built on Tone.js
│   │   ├── CameraRig.tsx     # Smooth R3F scroll-targeted spline camera flight rig
│   │   └── CosmosCanvas.tsx  # WebGL Canvas wrapper setup with performance bounds
│   ├── eras/
│   │   └── ErasContainer.tsx # 3D elements, materials, and particle clouds for all 13 Eras
│   └── hud/
│       └── HUD.tsx           # Sleek HUD panels & center Earth Milestone Ticker
├── physics/
│   ├── color.ts           # Tanner Helland blackbody spectrum math & cosmological redshift
│   ├── cosmology.ts       # Numerical solver for Friedmann acceleration equations
│   └── timeline.ts        # Piecewise logarithmic timeline translator & Earth milestones
└── store/
    └── useCosmosStore.ts  # Zustand reactive store synchronizing scroll progress
```

### 🧬 Physics Engine In-Depth

1.  **Friedmann Solver (`physics/cosmology.ts`)**:
    We evaluate the Friedmann equations to calculate how the scale factor $a(t)$ expands over time:
    $$H^2 = H_0^2 \left( \Omega_{r,0} a^{-4} + \Omega_{m,0} a^{-3} + \Omega_{k,0} a^{-2} + \Omega_{\Lambda,0} \right)$$
    The physics engine computes:
    *   **Temperature**: Shifting from $10^{32}\text{ K}$ down to $2.73\text{ K}$ based on $T(t) \propto a(t)^{-1}$.
    *   **Horizon Scale ($d_H$)**: Particle horizon tracking the maximum observable distance since the Big Bang.
    *   **Density ($\rho$)**: Matter, radiation, and dark energy densities relative to the critical density.

2.  **Blackbody Radiation to RGB (`physics/color.ts`)**:
    Implements Tanner Helland's algorithm to map thermodynamic temperatures to accurate HSL/RGB coordinates. As the timeline expands, colors shift from white-hot brilliance, to stellar blue-yellows, and finally down to deep red cosmic infrared shifts.

3.  **Earth Deep History Morphing (`components/eras/ErasContainer.tsx`)**:
    Scroll progress through Epoch 11 interpolates multiple material states:
    *   **Molten Magma ($0\%$ - $15\%$ progress)**: Fiery orange emission, high roughness.
    *   **Deep Oceans ($15\%$ - $30\%$ progress)**: Cool slate-blues, low roughness.
    *   **Oxygenation Haze ($30\%$ - $50\%$ progress)**: Soft cyan atmospheric emission.
    *   **Snowball Glaciation ($50\%$ - $65\%$ progress)**: Ice-white base color, low roughness ($0.3$) for specular reflections.
    *   **Cambrian & Continents ($65\%$ - $85\%$ progress)**: Green vegetation and dark blue oceans.
    *   **Civilization ($85\%$ - $100\%$ progress)**: Modern continents morphing with emissive golden city light arrays.

---

## 🎵 Sound Mapping Design

To elevate immersion, Tone.js synthesizes procedural audio in real time directly from physics variables:
*   **Era 0–3 (Big Bang to Quark Plasma)**: Intense FM synth noise generator representing turbulent density fluctuations.
*   **Era 4 (Nucleosynthesis)**: Resonant high-pass chimes triggered as atomic nuclei coalesce.
*   **Era 5 (Recombination / CMB)**: Sustained ambient minor chords with a low-frequency rumble representing the CMB acoustic peaks.
*   **Era 7 (First Stars)**: Bright sawtooth oscillators representing thermonuclear ignition.
*   **Era 11-12 (Modern Earth)**: Clean, high-frequency harmonic swells mapping the rise of technological civilization.

---

## 💻 Installation & Local Development

### Prerequisites
*   Node.js (v18.x or later recommended)
*   npm or yarn

### Installation
1.  Clone the repository and navigate into the folder:
    ```bash
    git clone <repository_url>
    cd cosmos
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal).

### Production Build
To check linting and build the production-ready Next.js static asset bundle:
```bash
npm run build
```

---

## 🎨 Visual Aesthetics & HUD Interface

*   **Dark Mode Core**: Deep space backing utilizing sleek `#030303` foundations.
*   **Glassmorphic Design**: HUD boxes constructed with translucent overlays, high-strength blurs (`backdrop-blur-md`), and high-end cosmic-blue gradients.
*   **Micro-Animations**: Linear parameter shifts, active milestone highlight states, and interactive hover scales on cards.
*   **Interactivity**: Left-click-and-drag within the 3D viewport to gently offset the camera perspective, letting you view epochs from different angles. Use scroll or mouse-wheel controls to drive the temporal voyage.

---

*“The Cosmos is all that is or was or ever will be. Our feeblest contemplations of the Cosmos stir us — there is a tingling in the spine, a catch in the voice, a faint sensation, as if a distant memory, of falling from a height. We know we are approaching the greatest of mysteries.”*  
— **Carl Sagan**
