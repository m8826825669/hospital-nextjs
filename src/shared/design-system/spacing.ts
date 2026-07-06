export const enterpriseSpacing = {
  none: "0",
  xxs: "0.25rem",
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
  "2xl": "2rem",
  "3xl": "2.5rem",
  "4xl": "3rem",
  "5xl": "4rem",
} as const;

export const enterpriseLayout = {
  pageX: "clamp(1rem, 2vw, 2rem)",
  pageY: "clamp(1rem, 1.6vw, 1.5rem)",
  contentMax: "96rem",
  formMax: "64rem",
  drawerWidth: "min(46rem, calc(100vw - 2rem))",
  sidebarWidth: "18rem",
  topNavHeight: "4rem",
} as const;
