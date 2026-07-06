export const enterpriseTypography = {
  fontFamily: {
    sans: "var(--font-sans, Inter, ui-sans-serif, system-ui, sans-serif)",
    mono: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
  },
  size: {
    caption: "0.75rem",
    bodySm: "0.8125rem",
    body: "0.875rem",
    bodyLg: "1rem",
    titleSm: "1.125rem",
    title: "1.25rem",
    titleLg: "1.5rem",
    displaySm: "1.875rem",
    display: "2.25rem",
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.15,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.65,
  },
} as const;
