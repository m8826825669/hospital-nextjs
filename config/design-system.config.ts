export const designSystem = {
  app: {
    shellWidth: "18rem",
    headerHeight: "4rem",
  },

  radius: {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  },

  card: {
    base: "rounded-xl border bg-background shadow-sm",
    interactive:
      "rounded-xl border bg-background shadow-sm transition hover:shadow-md",
    section: "rounded-xl border bg-background shadow-sm",
  },

  page: {
    container: "space-y-6",
    header: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
  },

  typography: {
    pageTitle: "text-2xl font-semibold tracking-tight",
    sectionTitle: "text-base font-semibold",
    description: "text-sm text-muted-foreground",
    label: "text-sm font-medium",
    caption: "text-xs text-muted-foreground",
  },
};