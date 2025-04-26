import { Theme } from "./theme";

export const darkTheme: Theme = {
  mode: "dark",
  background: {
    primary: "#1F1C2E",
    secondary: "#302D43",
    tertiary: "#383550",
  },
  colours: {
    primary: {
      strong: "#3A86FF",
      medium: "#5E60CE",
      fade: "#7B8CDE",
    },
    secondary: "#CD4FF7",
    states: {
      success: "#2EC27E",
      successFade: "#A3F7BF",
      danger: "#EF476F",
      dangerFade: "#FFD6DD",
      warning: "#FBB13C",
      warningFade: "#FFE6B5",
    },
    neutral: {
      one: "#44425F",
      two: "#5A5873",
    },
  },
  text: {
    colours: {
      normal: "#FFFFFF",
      alternative: "#9A9AB5",
      muted: "#CFCFE4",
    },
  },
};
