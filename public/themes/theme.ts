export type Theme = {
  mode: "light" | "dark";
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  colours: {
    primary: {
      strong: string;
      medium: string;
      fade: string;
    };
    secondary: string;
    states: {
      success: string;
      successFade: string;
      danger: string;
      dangerFade: string;
      warning: string;
      warningFade: string;
    };
    neutral: {
      one: string;
      two: string;
    };
  };
  text: {
    colours: {
      normal: string;
      alternative: string;
      muted: string;
    };
  };
};
