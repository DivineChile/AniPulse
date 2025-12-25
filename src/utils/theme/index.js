import { createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#f0f4ff" },
          100: { value: "#e0e7ff" },
          200: { value: "#c7d2fe" },
          300: { value: "#a5b4fc" },
          400: { value: "#818cf8" },
          500: { value: "#6366f1" },
          600: { value: "#4f46e5" },
          700: { value: "#4338ca" },
          800: { value: "#3730a3" },
          900: { value: "#312e81" },
        },
        cinemi: {
          // Deep blacks and grays
          darker: { value: "#0a0a0b" },
          dark: { value: "#141418" },
          medium: { value: "#1e1e23" },
          light: { value: "#2a2a30" },

          // Vibrant accent colors
          primary: { value: "#e50914" }, // Netflix-inspired red
          secondary: { value: "#00d4ff" }, // Electric blue
          accent: { value: "#ff6b35" }, // Warm orange
          gold: { value: "#ffd700" }, // Gold highlights

          // Subtle colors
          purple: { value: "#8b5cf6" }, // Purple accent
          green: { value: "#10b981" }, // Success green

          // Text colors
          text: {
            primary: { value: "#ffffff" },
            secondary: { value: "#b3b3b3" },
            muted: { value: "#737373" },
          },
        },
      },
      fonts: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif",
      },
    },
  },
  globalCss: {
    body: {
      bg: "cinemi.darker",
      color: "cinemi.text.primary",
      fontFamily: "Inter, sans-serif",
    },
    "*": {
      scrollbarWidth: "thin",
      scrollbarColor: "cinemi.medium cinemi.darker",
    },
    "*::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
    },
    "*::-webkit-scrollbar-track": {
      bg: "cinemi.darker",
    },
    "*::-webkit-scrollbar-thumb": {
      bg: "cinemi.medium",
      borderRadius: "3px",
    },
    "*::-webkit-scrollbar-thumb:hover": {
      bg: "cinemi.light",
    },
  },
});

// const theme = extendTheme({
//   config: {
//     initialColorMode: "dark",
//     useSystemColorMode: false,
//   },
//   styles: {
//     global: {
//       body: {
//         bg: "cinemi.darker",
//         color: "cinemi.text.primary",
//         fontFamily: "Inter, sans-serif",
//       },
//       "*": {
//         scrollbarWidth: "thin",
//         scrollbarColor: "cinemi.medium cinemi.darker",
//       },
//       "*::-webkit-scrollbar": {
//         width: "6px",
//         height: "6px",
//       },
//       "*::-webkit-scrollbar-track": {
//         bg: "cinemi.darker",
//       },
//       "*::-webkit-scrollbar-thumb": {
//         bg: "cinemi.medium",
//         borderRadius: "3px",
//       },
//       "*::-webkit-scrollbar-thumb:hover": {
//         bg: "cinemi.light",
//       },
//     },
//   },
//   components: {
//     Button: {
//       variants: {
//         cinemi: {
//           bg: "cinemi.primary",
//           color: "white",
//           fontWeight: "bold",
//           _hover: {
//             bg: "#b8070f",
//             transform: "translateY(-2px)",
//             boxShadow: "0 8px 25px rgba(229, 9, 20, 0.4)",
//           },
//           _active: {
//             bg: "#9a0610",
//             transform: "translateY(0)",
//           },
//           transition: "all 0.2s ease",
//         },
//         secondary: {
//           bg: "cinemi.secondary",
//           color: "cinemi.darker",
//           fontWeight: "bold",
//           _hover: {
//             bg: "#00b8e6",
//             transform: "translateY(-2px)",
//             boxShadow: "0 8px 25px rgba(0, 212, 255, 0.4)",
//           },
//           _active: {
//             bg: "#0099cc",
//           },
//           transition: "all 0.2s ease",
//         },
//         accent: {
//           bg: "cinemi.accent",
//           color: "white",
//           fontWeight: "bold",
//           _hover: {
//             bg: "#e55a2b",
//             transform: "translateY(-2px)",
//             boxShadow: "0 8px 25px rgba(255, 107, 53, 0.4)",
//           },
//           _active: {
//             bg: "#cc4a21",
//           },
//           transition: "all 0.2s ease",
//         },
//       },
//     },
//     Card: {
//       baseStyle: {
//         container: {
//           bg: "cinemi.dark",
//           borderColor: "cinemi.medium",
//         },
//       },
//     },
//     Input: {
//       variants: {
//         filled: {
//           field: {
//             bg: "cinemi.medium",
//             borderColor: "cinemi.light",
//             color: "cinemi.text.primary",
//             _hover: {
//               bg: "cinemi.light",
//             },
//             _focus: {
//               bg: "cinemi.light",
//               borderColor: "cinemi.primary",
//               boxShadow: "0 0 0 1px #e50914",
//             },
//           },
//         },
//       },
//     },
//     Menu: {
//       baseStyle: {
//         list: {
//           bg: "cinemi.dark",
//           borderColor: "cinemi.medium",
//         },
//         item: {
//           bg: "cinemi.dark",
//           color: "cinemi.text.primary",
//           _hover: {
//             bg: "cinemi.medium",
//           },
//           _focus: {
//             bg: "cinemi.medium",
//           },
//         },
//       },
//     },
//     Tabs: {
//       variants: {
//         "soft-rounded": {
//           tab: {
//             color: "cinemi.text.secondary",
//             _selected: {
//               color: "white",
//               bg: "cinemi.primary",
//             },
//             _hover: {
//               color: "cinemi.text.primary",
//             },
//           },
//         },
//       },
//     },
//     Accordion: {
//       baseStyle: {
//         container: {
//           borderColor: "cinemi.medium",
//         },
//         button: {
//           color: "cinemi.text.primary",
//           _hover: {
//             bg: "cinemi.medium",
//           },
//         },
//         panel: {
//           color: "cinemi.text.secondary",
//         },
//       },
//     },
//     Progress: {
//       baseStyle: {
//         track: {
//           bg: "cinemi.medium",
//         },
//         filledTrack: {
//           bg: "cinemi.secondary",
//         },
//       },
//     },
//   },
// });

export default system;
