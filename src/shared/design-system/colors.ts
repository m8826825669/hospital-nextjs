export const enterpriseColors = {
  brand: {
    50: "oklch(0.985 0.012 220)",
    100: "oklch(0.955 0.025 220)",
    200: "oklch(0.91 0.045 220)",
    300: "oklch(0.84 0.075 220)",
    400: "oklch(0.72 0.105 220)",
    500: "oklch(0.58 0.13 220)",
    600: "oklch(0.47 0.12 220)",
    700: "oklch(0.38 0.095 220)",
    800: "oklch(0.29 0.065 220)",
    900: "oklch(0.21 0.04 220)",
    950: "oklch(0.15 0.03 220)",
  },
  slate: {
    50: "oklch(0.985 0.003 240)",
    100: "oklch(0.96 0.006 240)",
    200: "oklch(0.91 0.008 240)",
    300: "oklch(0.84 0.012 240)",
    400: "oklch(0.68 0.016 240)",
    500: "oklch(0.52 0.018 240)",
    600: "oklch(0.42 0.02 240)",
    700: "oklch(0.32 0.02 240)",
    800: "oklch(0.22 0.018 240)",
    900: "oklch(0.16 0.016 240)",
    950: "oklch(0.11 0.014 240)",
  },
  semantic: {
    success: "oklch(0.55 0.14 145)",
    warning: "oklch(0.75 0.16 80)",
    danger: "oklch(0.58 0.22 25)",
    info: "oklch(0.56 0.13 240)",
  },
} as const;

export type EnterpriseColorScale = typeof enterpriseColors;
