/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      backgroundColor: {
        primary: {
          DEFAULT: "#1F1C2E",
          light: "#FFFFF",
        },
        secondary: {
          DEFAULT: "#302D43",
          light: "#FFFFF",
        },
        tertiary: {
          DEFAULT: "#383550",
          light: "#FFFFF",
        },
      },
      colors: {
        primary: {
          strong: {
            DEFAULT: "#3A86FF",
            light: "#FFFFFF",
          },
          medium: {
            DEFAULT: "#5E60CE",
            light: "#FFFFFF",
          },
          fade: {
            DEFAULT: "#7B8CDE",
            light: "#FFFFFF",
          },
        },
        secondary: {
          DEFAULT: "#CD4FF7",
          light: "#FFFFFF",
        },
        states: {
          success: {
            DEFAULT: "#2EC27E",
            light: "#FFFFFF",
          },
          successFade: {
            DEFAULT: "#A3F7BF",
            light: "#FFFFFF",
          },
          danger: {
            DEFAULT: "#EF476F",
            light: "#FFFFFF",
          },
          dangerFade: {
            DEFAULT: "#FFD6DD",
            light: "#FFFFFF",
          },
          warning: {
            DEFAULT: "#FBB13C",
            light: "#FFFFFF",
          },
          warningFade: {
            DEFAULT: "#FFE6B5",
            light: "#FFFFFF",
          },
        },
        neutral: {
          one: {
            DEFAULT: "#44425F",
            light: "#FFFFFF",
          },
          two: {
            DEFAULT: "#5A5873",
            light: "#FFFFFF",
          },
        },
      },
      textColor: {
        normal: {
          DEFAULT: "#FFFFFF",
          light: "#FFFFFF",
        },
        alternative: {
          DEFAULT: "#9A9AB5",
          light: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#CFCFE4",
          light: "#FFFFFF",
        },
      },
      fontFamily: {
        "regular-poppins": "Poppins-Regular",
        "bold-poppins": "Poppins-Bold",
        "semibold-poppins": "Poppins-Semibold",
        "medium-poppins": "Poppins-Medium",
      },
    },
  },
  plugins: [],
};
