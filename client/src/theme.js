// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff", // manually adjusted
    10: "#f8f3f7", // manually adjusted
    50: "#f0f0f0", // manually adjusted
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000", // manually adjusted
  },
  // primary: {
  //   // blue
  //   100: "#FBFADA",
  //   200: "#ADBC9F",
  //   300: "#7c9366",
  //   400: "#4d775c",
  //   500: "#436850",
  //   600: "#12372A", // manually adjusted
  //   700: "#339c2b",
  //   800: "#267420",
  //   900: "#11140e",
  // },
  primary: {
    // blue
    // 100: "#70788D",
    100: "#ffffff",
    200: "#676E82",
    300: "#434754",
    400: "#31343E",
    500: "#1F2127",
    600: "#060708", // manually adjusted
    700: "#000000",
    800: "#000000",
    900: "#000000",
  },
  // secondary: {
  //   // yellow
  //   50: "#f0f0f0", // manually adjusted
  //   100: "#fff6e0",
  //   200: "#ffedc2",
  //   300: "#ffe3a3",
  //   400: "#ffda85",
  //   500: "#ffd166",
  //   600: "#cca752",
  //   700: "#997d3d",
  //   800: "#665429",
  //   900: "#332a14",
  // },
  secondary: {
    // lavendar 
    50: "#EFF0F5", // manually adjusted
    100: "#EFF0F5",
    200: "#A2A9C8",// # violet A2A9C8
    300: "#d4d8d9",//C1B9E1
    400: "#353A49",
    500: "#A2A9C8",
    600: "#D5D8E6",//#F492C2 pink
    700: "#7B7B7F",
    800: "#212122",
    900: "#000000",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[10],
              alt: tokensDark.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
