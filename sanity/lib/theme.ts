// ./studio/theme.ts
import { buildLegacyTheme } from "sanity";

export const myTheme = buildLegacyTheme({
  // Base colors - bright and clean light mode
  "--black": "#1a1a1a",
  "--white": "#ffffff",

  // Component backgrounds - pure white and light
  "--component-bg": "#ffffff",
  "--component-text-color": "#1a1a1a",

  // Primary button - vibrant sage green from your logo
  "--default-button-primary-color": "#7ba68c",

  // Success - fresh mint green
  "--default-button-success-color": "#90d4aa",

  // Warning - warm coral from your logo
  "--default-button-warning-color": "#f4a6a0",

  // Danger - soft coral pink
  "--default-button-danger-color": "#ec8b85",

  // State colors matching buttons
  "--state-success-color": "#90d4aa",
  "--state-warning-color": "#f4a6a0",
  "--state-danger-color": "#ec8b85",

  // Main navigation - golden yellow from your logo
  "--main-navigation-color": "#d1a76f",
  "--main-navigation-color--inverted": "#ffffff",

  // Focus color - sage green for consistency
  "--focus-color": "#7ba68c",
});
