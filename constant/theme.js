export const COLORS = {
  btnColor: "#1C8919",
  btnTextColor: "#ffffff",
  appTextColor: "#000000",
  tokenDetailsBackgroundColor: "#EFFFEB",

  secondary: "#4D626C",

  white: "#FFF",
  gray: "#74858C",
  textColor: "#3A3A3A",
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
};

export const FONTS = {
  bold: "PoppinsBold",
  semiBold: "PoppinsSemiBold",
  regular: "PoppinsRegular",
  light: "PoppinsLight",
  extraBold: "PoppinsExtraBold",
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};
