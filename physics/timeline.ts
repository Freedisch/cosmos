import { getScaleFactor, getTemperature, getDensity, getUniverseDiameterLY } from "./cosmology";

export interface GeologicalMilestone {
  timeAgo: string;
  name: string;
  tagline: string;
  description: string;
  scrollFraction: number; // Relative progress inside Earth era (0 to 1)
}

export interface Era {
  id: number;
  name: string;
  shortName: string;
  timeStart: number; // in seconds
  timeEnd: number; // in seconds
  scrollStart: number; // 0 to 1
  scrollEnd: number; // 0 to 1
  tagline: string;
  description: string;
  expandedInfo: string;
  elements: { name: string; percentage: number }[];
  facts: string[];
  geologicalMilestones?: GeologicalMilestone[];
}

export const ERAS: Era[] = [
  {
    id: 0,
    name: "The Big Bang",
    shortName: "Big Bang",
    timeStart: 0,
    timeEnd: 1e-45,
    scrollStart: 0.00,
    scrollEnd: 0.05,
    tagline: "The birth of space and time.",
    description: "The universe erupts from an infinitely dense, infinitely hot singularity. Space and time themselves are created, launching the expansion of the cosmos.",
    expandedInfo: "At the moment of the Big Bang, all matter, energy, space, and time were compressed into a singular point of infinite density. As space expanded, it rapidly cooled, allowing the laws of physics to crystallize. This origin represents the absolute beginning of our 13.8 billion year chronicle.",
    elements: [],
    facts: [
      "Space itself expanded explosively from a single point—it did not explode *into* existing space.",
      "The initial temperature and density were infinitely high, beyond the description of general relativity.",
      "This moment marks the inception of the cosmic background radiation and cosmic expansion."
    ]
  },
  {
    id: 1,
    name: "Planck Epoch",
    shortName: "Planck Era",
    timeStart: 1e-45,
    timeEnd: 1e-43,
    scrollStart: 0.05,
    scrollEnd: 0.12,
    tagline: "Spacetime in quantum foam.",
    description: "Gravity is strong enough to warp space and time into chaotic quantum fluctuations. All four fundamental forces of nature are unified into a single superforce.",
    expandedInfo: "At this extreme density, gravity was as strong as the other subatomic forces. Space and time as we know them did not yet exist; instead, they emerged from a chaotic tesseract-like foam. The temperature is at the absolute physical limit—the Planck temperature (10³² K).",
    elements: [],
    facts: [
      "All four fundamental forces (Gravity, Electromagnetism, Strong, and Weak Nuclear forces) were unified.",
      "The observable universe was smaller than a Planck length (10⁻³⁵ meters).",
      "No matter or light existed yet—only unified energy and spacetime geometry fluctuating wildly."
    ]
  },
  {
    id: 2,
    name: "Cosmic Inflation",
    shortName: "Inflation",
    timeStart: 1e-43,
    timeEnd: 1e-32,
    scrollStart: 0.12,
    scrollEnd: 0.20,
    tagline: "Exponential growth of space itself.",
    description: "Driven by a mysterious scalar field, the universe expands by a factor of 10²⁶ in a fraction of a second, stretching subatomic fluctuations into cosmic structures.",
    expandedInfo: "Inflation stretched the flat fabric of the universe at speeds far exceeding the speed of light. Tiny, subatomic quantum fluctuations in density were pulled into macroscopic proportions, freezing them into place. These frozen ripples became the seeds that would later condense into stars, galaxies, and clusters.",
    elements: [],
    facts: [
      "The universe expanded by a factor of ~10²⁶, going from subatomic to about the size of a marble in 10⁻³² seconds.",
      "This faster-than-light expansion does not violate relativity because it is space itself that is stretching, not particles traveling through it.",
      "This process smoothed out any curvature, explaining why our observable universe appears perfectly flat today."
    ]
  },
  {
    id: 3,
    name: "Quark-Gluon Plasma",
    shortName: "Quark Epoch",
    timeStart: 1e-32,
    timeEnd: 1e-6,
    scrollStart: 0.20,
    scrollEnd: 0.28,
    tagline: "A super-hot, turbulent elemental soup.",
    description: "The universe is filled with a dense, roiling soup of elementary particles—quarks, gluons, and leptons—colliding at extreme energies.",
    expandedInfo: "Temperatures are too high for quarks to bind together into protons and neutrons. Instead, they form a perfect, near-frictionless fluid known as a quark-gluon plasma. Electroweak symmetry breaks, separating the electromagnetic and weak nuclear forces, and particles acquire mass through the Higgs field.",
    elements: [],
    facts: [
      "Quarks and gluons moved freely as a liquid plasma, rather than being confined inside protons and neutrons.",
      "Matter and antimatter annihilated each other, but a tiny asymmetry (1 extra matter particle per billion) left a surplus of matter.",
      "Light was completely trapped in this dense medium, scattering continuously off free electrons."
    ]
  },
  {
    id: 4,
    name: "Big Bang Nucleosynthesis",
    shortName: "Nucleosynthesis",
    timeStart: 1e-6,
    timeEnd: 1200, // 20 minutes
    scrollStart: 0.28,
    scrollEnd: 0.36,
    tagline: "The synthesis of the first atomic nuclei.",
    description: "The universe cools enough for protons and neutrons to bind, synthesizing the first light atomic nuclei: Hydrogen, Helium, and traces of Lithium.",
    expandedInfo: "As the temperature falls to about 1 Billion Kelvin, nuclear fusion begins. Free neutrons fuse with protons, forming deuterium, which quickly combines to form Helium-4. After 20 minutes, the universe cools too much for further fusion, freezing the element abundance ratios for the next hundreds of millions of years.",
    elements: [
      { name: "Hydrogen", percentage: 75 },
      { name: "Helium", percentage: 25 },
      { name: "Lithium", percentage: 0.001 }
    ],
    facts: [
      "Almost all helium in the universe today was created during these first 20 minutes, not inside stars.",
      "The chemical composition of the pristine universe converged to 75% Hydrogen and 25% Helium by mass.",
      "Trace amounts of Deuterium and Lithium-7 were forged, providing a critical test of Big Bang theory."
    ]
  },
  {
    id: 5,
    name: "Recombination & CMB Release",
    shortName: "Recombination",
    timeStart: 1200,
    timeEnd: 1.2e13, // 380,000 years
    scrollStart: 0.36,
    scrollEnd: 0.44,
    tagline: "Let there be light.",
    description: "Electrons combine with protons to form neutral atoms. Photons decouple from matter, streaming freely through space as the Cosmic Microwave Background.",
    expandedInfo: "The temperature drops to ~3000 K. Free electrons, which previously scattered photons, are bound into Hydrogen and Helium atoms. The universe suddenly becomes transparent. These newly liberated photons have been traveling through space ever since, redshifted by the expansion of space into the microwave spectrum we detect today.",
    elements: [
      { name: "Hydrogen", percentage: 75 },
      { name: "Helium", percentage: 25 },
      { name: "Lithium", percentage: 0.001 }
    ],
    facts: [
      "This is the source of the Cosmic Microwave Background (CMB), the oldest light in the universe.",
      "Before recombination, the universe was a glowing, opaque orange fog; afterward, it became crystal clear.",
      "If you tune an old analog television between channels, about 1% of the static you see is the CMB afterglow."
    ]
  },
  {
    id: 6,
    name: "Cosmic Dark Ages",
    shortName: "Dark Ages",
    timeStart: 1.2e13,
    timeEnd: 3.15e15, // 100 million years
    scrollStart: 0.44,
    scrollEnd: 0.52,
    tagline: "The universe in absolute shadow.",
    description: "With no stars or galaxies yet formed, the universe is a silent, expanding expanse of neutral hydrogen and dark matter, cooling in absolute darkness.",
    expandedInfo: "Though called the Dark Ages, this was a crucial era. Invisible dark matter began collapsing under its own gravity, forming a vast cosmic web. Pristine hydrogen and helium gas fell into these gravitational potential wells, slowly condensing at the nodes of the web, preparing the universe for its first ignition.",
    elements: [
      { name: "Hydrogen", percentage: 75 },
      { name: "Helium", percentage: 25 },
      { name: "Lithium", percentage: 0.001 }
    ],
    facts: [
      "There were absolutely no stars, galaxies, or planets—just vast clouds of cold gas.",
      "The universe was filled with hydrogen that emitted a faint, invisible 21cm radio signal, which astronomers study today.",
      "Gravity was silently assembling the scaffolding of the modern universe using dark matter."
    ]
  },
  {
    id: 7,
    name: "Cosmic Dawn (First Stars)",
    shortName: "First Stars",
    timeStart: 3.15e15,
    timeEnd: 1.26e16, // 400 million years
    scrollStart: 0.52,
    scrollEnd: 0.60,
    tagline: "First light from Population III stars.",
    description: "The first generation of stars ignites. Massive, pristine, and luminous, these short-lived monsters collapse and seed the cosmos with the first heavy elements.",
    expandedInfo: "These stars, called Population III, were made of pure Hydrogen and Helium. Lacking heavier elements to help them cool as they collapsed, they had to be massive—often 100 to 1000 times the mass of the Sun. They burned brilliantly hot, living only a few million years before exploding in cataclysmic hypernovae, synthesizing and dispersing carbon, oxygen, and iron.",
    elements: [
      { name: "Hydrogen", percentage: 74.9 },
      { name: "Helium", percentage: 25.0 },
      { name: "Heavy Metals", percentage: 0.1 }
    ],
    facts: [
      "Population III stars were completely metal-free and burned with an ultra-hot, deep blue-white surface (~100,000 K).",
      "Their intense ultraviolet light reionized the surrounding hydrogen gas, returning it to a plasma state.",
      "Their hypernovae forged the very first atoms of carbon, oxygen, silicon, and iron in the universe."
    ]
  },
  {
    id: 8,
    name: "Galaxy Formation",
    shortName: "Galaxy Era",
    timeStart: 1.26e16,
    timeEnd: 3.15e16, // 1 billion years
    scrollStart: 0.60,
    scrollEnd: 0.68,
    tagline: "Assembly of the first galactic structures.",
    description: "Gravity merges early star clusters and gas clouds into small, irregular proto-galaxies, initiating a period of runaway starburst activity.",
    expandedInfo: "The universe becomes transparent again as radiation from early galaxies strips electrons from intergalactic hydrogen (Reionization). Gas cools and collapses within dark matter halos, triggering hierarchical mergers where smaller irregular star clusters collide to form the seeds of majestic spiral and elliptical galaxies.",
    elements: [
      { name: "Hydrogen", percentage: 74.5 },
      { name: "Helium", percentage: 25.0 },
      { name: "Heavy Metals", percentage: 0.5 }
    ],
    facts: [
      "The first galaxies were small, clumped, and highly irregular—nothing like today's grand spirals.",
      "The James Webb Space Telescope (JWST) was specifically designed to capture the faint infrared light from this era.",
      "Quasars—supermassive black holes devouring gas at galactic cores—ignited, shining brighter than entire galaxies."
    ]
  },
  {
    id: 9,
    name: "Stellar Evolution & Cosmic Noon",
    shortName: "Stellar Era",
    timeStart: 3.15e16,
    timeEnd: 2.84e17, // 9 billion years
    scrollStart: 0.68,
    scrollEnd: 0.76,
    tagline: "Cosmic Noon and generations of stars.",
    description: "Star formation rates peak. Majestic spiral arms form, and successive generations of stars enrich the interstellar medium with complex elements.",
    expandedInfo: "Around 3.3 Billion years after the Big Bang (Cosmic Noon), the universe reached its peak star-building phase. Star-forming gas became highly enriched with carbon, oxygen, and silicon from previous stellar deaths. Dust lanes began to form, and galaxies settled into stable, beautiful spiral structures like our Milky Way.",
    elements: [
      { name: "Hydrogen", percentage: 73.8 },
      { name: "Helium", percentage: 24.8 },
      { name: "Heavy Metals", percentage: 1.4 }
    ],
    facts: [
      "Star formation peaked 10 billion years ago; the universe has been in a slow decline in star production ever since.",
      "Galactic density waves swept through rotating disks, creating permanent spiral arm structures.",
      "Supernovae enriched the universe to about 1-2% metal abundance, allowing rocky planet cores to form."
    ]
  },
  {
    id: 10,
    name: "Solar System Formation",
    shortName: "Solar System",
    timeStart: 2.84e17,
    timeEnd: 2.90e17, // 9.2 billion years (4.6 Billion Years Ago)
    scrollStart: 0.76,
    scrollEnd: 0.84,
    tagline: "The birth of our Sun and planets.",
    description: "A local molecular cloud collapses, forming a proto-stellar disk. Angular momentum shapes a spinning disk where dust grains accrete into planets.",
    expandedInfo: "Enriched by the ashes of dead stars, a cloud of gas and dust collapsed. The center became dense and hot, igniting as our Sun. In the surrounding disk, rocky dust grains collided and melted together in the hot inner region, while volatile ice particles survived in the cold outer region, giving rise to gas giants and rocky planets.",
    elements: [
      { name: "Hydrogen", percentage: 73.5 },
      { name: "Helium", percentage: 24.5 },
      { name: "Heavy Metals", percentage: 2.0 }
    ],
    facts: [
      "Our solar system collapsed from a nebula likely triggered by a nearby supernova shockwave.",
      "The sun contains 99.86% of all the mass in the solar system; the rest is mostly Jupiter.",
      "All heavy metals in your keys, rings, and computer chips were forged in stars that died before our sun was born."
    ]
  },
  {
    id: 11,
    name: "Earth: Geological Evolution",
    shortName: "Earth Era",
    timeStart: 2.90e17,
    timeEnd: 4.35e17, // 13.8 billion years
    scrollStart: 0.84,
    scrollEnd: 0.93,
    tagline: "A blue oasis in the dark.",
    description: "The Earth cools, forming liquid oceans. Life emerges, oxygenates the atmosphere, and branches into complex forms across plate-drifting continents.",
    expandedInfo: "Earth transitioned from a molten, magma-covered Hadean world to a water-rich oasis. Single-celled cyanobacteria triggered the Great Oxygenation Event. Life evolved from simple single cells to complex multicellular organisms, navigating ice ages, plate tectonics, and five mass extinctions, eventually leading to conscious species.",
    elements: [
      { name: "Hydrogen", percentage: 73.4 },
      { name: "Helium", percentage: 24.5 },
      { name: "Heavy Metals", percentage: 2.1 }
    ],
    facts: [
      "Earth's water may have been delivered by collisions with ice-rich comets and asteroids in its youth.",
      "Liquid water has existed on Earth's surface for over 4 billion years, providing stable conditions for life.",
      "The moon was forged from the debris of a mars-sized planetesimal (Theia) colliding with the proto-Earth."
    ],
    geologicalMilestones: [
      {
        timeAgo: "4.5 Bya",
        name: "Hadean Magma Ocean",
        tagline: "A hellish, molten furnace.",
        description: "Proto-Earth collides with a Mars-sized planet named Theia, ejecting debris that forms the Moon. Magma oceans cover the red-hot surface.",
        scrollFraction: 0.0
      },
      {
        timeAgo: "3.8 Bya",
        name: "Liquid Oceans & Archean Life",
        tagline: "The cradle of terrestrial life.",
        description: "The crust cools, water vapor condenses into deep oceans, and the first single-cell life (microbes) emerges near deep hydrothermal vents.",
        scrollFraction: 0.2
      },
      {
        timeAgo: "2.4 Bya",
        name: "Great Oxygenation Event",
        tagline: "The first global extinction.",
        description: "Photosynthetic cyanobacteria emerge, flooding the atmosphere with toxic oxygen, forming banded iron rock beds, and shifting the climate.",
        scrollFraction: 0.4
      },
      {
        timeAgo: "700 Mya",
        name: "Cryogenian Snowball Earth",
        tagline: "The frozen planet.",
        description: "A runaway ice-albedo climate locks the entire globe in glaciers from pole to pole, encasing the biosphere in a thick layer of ice.",
        scrollFraction: 0.6
      },
      {
        timeAgo: "540 Mya",
        name: "Cambrian Explosion",
        tagline: "The burst of complex organisms.",
        description: "An evolutionary leap occurs in shallow seas, creating hard-shelled marine animals and complex body plans (trilobites, mollusks).",
        scrollFraction: 0.75
      },
      {
        timeAgo: "66 Mya",
        name: "Chicxulub Asteroid Impact",
        tagline: "The death of the dinosaurs.",
        description: "A 10km asteroid strikes Mexico, triggering global firestorms, darkness, and a nuclear winter that exterminates 75% of species.",
        scrollFraction: 0.9
      },
      {
        timeAgo: "Present",
        name: "Rise of Civilization",
        tagline: "The universe looks back.",
        description: "Homo sapiens build global networks, industrialize the landscape, and launch spaceships to peer back into the Big Bang origin.",
        scrollFraction: 1.0
      }
    ]
  },
  {
    id: 12,
    name: "The Present Day",
    shortName: "Now",
    timeStart: 4.35e17,
    timeEnd: 4.355e17,
    scrollStart: 0.93,
    scrollEnd: 1.00,
    tagline: "You are here.",
    description: "13.8 billion years of cosmic history culminate in this very second. We are the universe looking back at itself.",
    expandedInfo: "Today, the observable universe is 93 billion light-years across, containing 2 trillion galaxies and 10²⁴ stars. Driven by Dark Energy, the expansion of the universe is accelerating. We live in a brief cosmic window where the past is still visible, allowing us to reconstruct our origin story.",
    elements: [
      { name: "Hydrogen", percentage: 73.3 },
      { name: "Helium", percentage: 24.5 },
      { name: "Heavy Metals", percentage: 2.2 }
    ],
    facts: [
      "The universe is currently expanding at an accelerating rate due to the influence of Dark Energy.",
      "95% of the universe is composed of invisible stuff: 68% Dark Energy, 27% Dark Matter.",
      "Carl Sagan famously said: 'We are a way for the cosmos to know itself.'"
    ]
  }
];

/**
 * Maps scroll progress (0 to 1) to cosmic time in seconds.
 * Implements piecewise logarithmic interpolation within each era,
 * with a linear fallback for the Big Bang (era 0).
 */
export function scrollToCosmicTime(scroll: number): number {
  const s = Math.min(1.0, Math.max(0.0, scroll));

  // Find which era we are currently in
  const era = ERAS.find(e => s >= e.scrollStart && s <= e.scrollEnd) || ERAS[ERAS.length - 1];

  const eraScrollFraction = (s - era.scrollStart) / (era.scrollEnd - era.scrollStart);

  if (era.id === 0) {
    // Big Bang: linear interpolation from 0 to 1e-45 s
    return era.timeStart + eraScrollFraction * (era.timeEnd - era.timeStart);
  } else {
    // Logarithmic interpolation for subsequent eras
    const logStart = Math.log10(era.timeStart);
    const logEnd = Math.log10(era.timeEnd);
    const logInterpolated = logStart + eraScrollFraction * (logEnd - logStart);
    return Math.pow(10, logInterpolated);
  }
}

/**
 * Maps cosmic time in seconds to scroll progress (0 to 1).
 * Reciprocates the piecewise logarithmic / linear mapping.
 */
export function cosmicTimeToScroll(t: number): number {
  const time = Math.min(ERAS[ERAS.length - 1].timeEnd, Math.max(0, t));

  // Find which era the time fits into
  const era = ERAS.find(e => time >= e.timeStart && time <= e.timeEnd) || ERAS[ERAS.length - 1];

  if (era.id === 0) {
    // Linear mapping for Big Bang Epoch
    const frac = time / era.timeEnd;
    return era.scrollStart + frac * (era.scrollEnd - era.scrollStart);
  } else {
    // Logarithmic mapping
    const logStart = Math.log10(era.timeStart);
    const logEnd = Math.log10(era.timeEnd);
    const logCurrent = Math.log10(time);
    const frac = (logCurrent - logStart) / (logEnd - logStart);
    return era.scrollStart + frac * (era.scrollEnd - era.scrollStart);
  }
}

/**
 * Calculates all cosmic parameters at a given scroll progress.
 */
export function getCosmicStateAtScroll(scroll: number) {
  const time = scrollToCosmicTime(scroll);
  const scaleFactor = getScaleFactor(time);
  const temperature = getTemperature(scaleFactor);
  const density = getDensity(scaleFactor);
  const diameter = getUniverseDiameterLY(scaleFactor);
  const activeEra = ERAS.find(e => scroll >= e.scrollStart && scroll <= e.scrollEnd) || ERAS[ERAS.length - 1];

  return {
    time,
    scaleFactor,
    temperature,
    density,
    diameter,
    activeEra
  };
}
