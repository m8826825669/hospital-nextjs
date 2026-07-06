import { enterpriseAnimations } from "./animations";
import { enterpriseBreakpoints } from "./breakpoints";
import { enterpriseColors } from "./colors";
import { enterpriseRadius } from "./radius";
import { enterpriseShadows } from "./shadows";
import { enterpriseLayout, enterpriseSpacing } from "./spacing";
import { enterpriseTypography } from "./typography";
import { enterpriseZIndex } from "./z-index";

export const enterpriseTheme = {
  colors: enterpriseColors,
  spacing: enterpriseSpacing,
  layout: enterpriseLayout,
  typography: enterpriseTypography,
  radius: enterpriseRadius,
  shadows: enterpriseShadows,
  animations: enterpriseAnimations,
  breakpoints: enterpriseBreakpoints,
  zIndex: enterpriseZIndex,
} as const;

export type EnterpriseTheme = typeof enterpriseTheme;
