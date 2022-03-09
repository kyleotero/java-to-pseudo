module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        dark: "#aab7c2",
        main: "#191b1d",
      },
      boxShadow: {
        bot: "0px 0.8em 1.2em #26292b",
        button: "0px 0.4em 0.8em #26292b",
      },
      spacing: {
        "92%": "92%",
        "95%": "95%",
        diff: "screen - 83%",
      },
      fontSize: {
        standard: "1vw",
      },
      content: {
        pre: "attr(pref)",
      },
      fontFamily: {
        jetBrains: ["jetBrains"],
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
