// Physical constants in SI units
export const C = 299792458; // Speed of light (m/s)
export const G = 6.6743e-11; // Gravitational constant (m^3/kg/s^2)
export const H0_km_s_Mpc = 67.4; // Planck 2018 Hubble constant
export const H0 = (H0_km_s_Mpc * 1000) / 3.085677581e22; // H0 in s^-1 (~2.18e-18 s^-1)
export const T0 = 2.7255; // CMB temperature today in Kelvin
export const RHO_CRIT = (3 * H0 * H0) / (8 * Math.PI * G); // Critical density today (~8.6e-27 kg/m^3)

// Cosmological energy budget today
export const OMEGA_R = 9.2e-5; // Radiation density parameter (photons + neutrinos)
export const OMEGA_M = 0.315; // Matter density parameter (baryonic + dark matter)
export const OMEGA_L = 0.685; // Dark Energy density parameter (Lambda)

/**
 * Calculates the scale factor a(t) for a given time t in seconds since the Big Bang.
 * Approximated using piecewise analytic solutions of Friedmann equations.
 */
export function getScaleFactor(t: number): number {
  if (t <= 0) return 0;

  // Age of the universe today in seconds (~13.8 billion years)
  const t_now = 13.8e9 * 365.25 * 24 * 3600; // ~4.35e17 seconds

  // Transition times (approximate boundary in seconds)
  // Radiation-Matter equality happens at t ~ 50,000 years (~1.58e12 seconds)
  // Matter-Lambda equality happens at t ~ 9.8 billion years (~3.09e17 seconds)
  const t_eq_rm = 1.58e12;
  const t_eq_ml = 3.09e17;

  // Let's compute a continuous scaling relation
  if (t < t_eq_rm) {
    // Radiation dominated: a(t) ~ t^(1/2)
    // Scale it such that it matches the matter-dominated phase at t_eq_rm
    const a_eq_rm = 2.9e-4; // Scale factor at equality
    return a_eq_rm * Math.sqrt(t / t_eq_rm);
  } else if (t < t_eq_ml) {
    // Matter dominated: a(t) ~ t^(2/3)
    // Scale it to be 1.0 today
    // We adjust the coefficient so it connects smoothly at t_eq_rm
    const a_eq_rm = 2.9e-4;
    return a_eq_rm * Math.pow(t / t_eq_rm, 2 / 3);
  } else {
    // Dark Energy dominated: a(t) grows exponentially
    // We interpolate smoothly to 1.0 today (t_now)
    const a_eq_ml = 0.77; // Scale factor when DE starts dominating
    const H_lambda = H0 * Math.sqrt(OMEGA_L);
    return a_eq_ml * Math.exp(H_lambda * (t - t_eq_ml));
  }
}

/**
 * Calculates the temperature of the universe in Kelvin at a given scale factor `a`.
 */
export function getTemperature(a: number): number {
  if (a <= 0) return 1e32; // Limit to Planck temperature at t=0

  // T(a) = T0 / a
  let temp = T0 / a;

  // Cap at physical maximums (Planck temperature)
  if (temp > 1e32) temp = 1e32;
  return temp;
}

/**
 * Calculates the Hubble parameter H(t) in km/s/Mpc at scale factor `a`.
 */
export function getHubbleParameter(a: number): number {
  if (a <= 0) return 1e20; // Extremely high near t=0

  // H(a) = H0 * sqrt(Omega_r * a^-4 + Omega_m * a^-3 + Omega_L)
  const h_ratio = Math.sqrt(
    OMEGA_R * Math.pow(a, -4) +
    OMEGA_M * Math.pow(a, -3) +
    OMEGA_L
  );

  return H0_km_s_Mpc * h_ratio;
}

/**
 * Calculates the total density of the universe in kg/m^3 at scale factor `a`.
 */
export function getDensity(a: number): number {
  if (a <= 0) return 1e90; // Extremely high near t=0

  // rho(a) = rho_crit * (Omega_r * a^-4 + Omega_m * a^-3 + Omega_L)
  return RHO_CRIT * (
    OMEGA_R * Math.pow(a, -4) +
    OMEGA_M * Math.pow(a, -3) +
    OMEGA_L
  );
}

/**
 * Calculates the approximate observable horizon diameter in light-years at a given scale factor `a`.
 * Today (a=1) it is 93 billion light-years.
 */
export function getUniverseDiameterLY(a: number): number {
  if (a <= 0) return 0;
  // Today's diameter is 93 billion light-years
  // In early universe (Radiation dominated), horizon size is ~ 2 * c * t
  // In Matter dominated, horizon size is ~ 3 * c * t
  // We can interpolate utilizing a simple scaling relation that converges to 93 billion today.
  return 93e9 * Math.pow(a, 1.15);
}

/**
 * Helper to convert seconds into human readable text (years, Myr, Gyr, seconds)
 */
export function formatTime(seconds: number): { value: string; unit: string; full: string } {
  const Gyr = 1e9 * 365.25 * 24 * 3600;
  const Myr = 1e6 * 365.25 * 24 * 3600;
  const year = 365.25 * 24 * 3600;

  if (seconds >= Gyr) {
    const val = seconds / Gyr;
    return {
      value: val.toFixed(3),
      unit: "Gyr",
      full: `${val.toFixed(3)} Billion Years`,
    };
  } else if (seconds >= Myr) {
    const val = seconds / Myr;
    return {
      value: val.toFixed(1),
      unit: "Myr",
      full: `${val.toFixed(1)} Million Years`,
    };
  } else if (seconds >= year) {
    const val = seconds / year;
    return {
      value: Math.round(val).toLocaleString(),
      unit: "years",
      full: `${Math.round(val).toLocaleString()} Years`,
    };
  } else if (seconds < 1e-6) {
    // Express in scientific notation for sub-microsecond
    return {
      value: seconds.toExponential(2),
      unit: "s",
      full: `${seconds.toExponential(2)} Seconds`,
    };
  } else {
    return {
      value: seconds.toFixed(3),
      unit: "s",
      full: `${seconds.toFixed(3)} Seconds`,
    };
  }
}

/**
 * Helper to format temperature nicely (Kelvin or eV)
 */
export function formatTemperature(k: number): string {
  if (k >= 1e27) return `${(k / 1e30).toFixed(2)} × 10³⁰ K (Planck Scale)`;
  if (k >= 1e12) return `${(k / 1e12).toFixed(2)} Trillion K`;
  if (k >= 1e9) return `${(k / 1e9).toFixed(2)} Billion K`;
  if (k >= 1e6) return `${(k / 1e6).toFixed(2)} Million K`;
  if (k >= 1000) return `${Math.round(k).toLocaleString()} K`;
  return `${k.toFixed(2)} K`;
}

/**
 * Helper to format density nicely (kg/m^3 or g/cm^3)
 */
export function formatDensity(kg_m3: number): string {
  if (kg_m3 > 1e15) return `${kg_m3.toExponential(2)} kg/m³ (Extreme)`;
  if (kg_m3 < 1e-24) return `${(kg_m3 * 1e30).toFixed(2)} × 10⁻³⁰ kg/m³`;
  if (kg_m3 < 1e-6) return `${kg_m3.toExponential(2)} kg/m³`;
  return `${kg_m3.toFixed(6)} kg/m³`;
}

/**
 * Helper to format universe diameter nicely (light-years, AU, km)
 */
export function formatDiameter(ly: number): string {
  if (ly >= 1e9) return `${(ly / 1e9).toFixed(3)} Billion ly`;
  if (ly >= 1e6) return `${(ly / 1e6).toFixed(1)} Million ly`;
  if (ly >= 1) return `${Math.round(ly).toLocaleString()} ly`;
  
  // Under 1 light year, convert to AU (1 ly = 63241.1 AU)
  const au = ly * 63241.1;
  if (au >= 1) return `${Math.round(au).toLocaleString()} AU`;
  
  // Under 1 AU, convert to km (1 AU = 1.496e8 km)
  const km = au * 1.496e8;
  return `${km.toExponential(2)} km`;
}
