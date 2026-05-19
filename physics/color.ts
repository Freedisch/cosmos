/**
 * Converts a blackbody temperature in Kelvin to an RGB color.
 * Based on the Tanner Helland algorithm with adaptations for extreme ranges.
 */
export function kelvinToRGB(kelvin: number): { r: number; g: number; b: number } {
  // Clamp temperature between 1000K and 40000K for the algorithm
  const k = Math.min(40000, Math.max(1000, kelvin));
  
  let temp = k / 100;
  let r = 0;
  let g = 0;
  let b = 0;

  // Calculate Red
  if (temp <= 66) {
    r = 255;
  } else {
    r = temp - 60;
    r = 329.698727446 * Math.pow(r, -0.1332047592);
  }

  // Calculate Green
  if (temp <= 66) {
    g = temp;
    g = 99.4708025861 * Math.log(g) - 161.1195681661;
  } else {
    g = temp - 60;
    g = 288.1221695283 * Math.pow(g, -0.0755148492);
  }

  // Calculate Blue
  if (temp >= 66) {
    b = 255;
  } else if (temp <= 19) {
    b = 0;
  } else {
    b = temp - 10;
    b = 138.5177312231 * Math.log(b) - 305.0447927307;
  }

  // Handle extremely low temperature fade-out (< 1000K)
  let intensity = 1.0;
  if (kelvin < 1000) {
    // Smoothly fade out intensity as it cools towards absolute zero
    intensity = Math.max(0, (kelvin - 10) / 990);
  }

  return {
    r: Math.min(255, Math.max(0, Math.round(r * intensity))),
    g: Math.min(255, Math.max(0, Math.round(g * intensity))),
    b: Math.min(255, Math.max(0, Math.round(b * intensity))),
  };
}

/**
 * Returns a CSS rgb() string for a given Kelvin temperature
 */
export function kelvinToCSS(kelvin: number): string {
  const { r, g, b } = kelvinToRGB(kelvin);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Calculates the cosmologically redshifted observed temperature.
 * T_obs = T_emit / (1 + z) = T_emit * a(t)
 */
export function getRedshiftedTemperature(emittedTemp: number, scaleFactor: number): number {
  return emittedTemp * scaleFactor;
}

/**
 * Converts a Kelvin temperature, adjusted for cosmological redshift, to a CSS color.
 * If the redshift shifts it out of the visible spectrum, it will fade to dark red or transparent.
 */
export function getRedshiftedCSS(emittedTemp: number, scaleFactor: number): string {
  const observedTemp = getRedshiftedTemperature(emittedTemp, scaleFactor);
  return kelvinToCSS(observedTemp);
}

/**
 * Helper to get a beautiful hex color for elements based on their type
 */
export function getElementColor(element: string): string {
  switch (element.toLowerCase()) {
    case "hydrogen":
    case "h":
      return "#3b82f6"; // Radiant blue
    case "helium":
    case "he":
      return "#ef4444"; // Fiery red
    case "lithium":
    case "li":
      return "#10b981"; // Emerald green
    case "beryllium":
    case "be":
      return "#f59e0b"; // Amber gold
    case "metals":
    case "carbon":
    case "oxygen":
    case "iron":
      return "#a855f7"; // Neon purple (stellar ashes)
    default:
      return "#94a3b8"; // Slate grey
  }
}
