export default {
  plugins: {
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "680px",
        "mantine-breakpoint-sm": "980px",
        "mantine-breakpoint-md": "1300px",
        "mantine-breakpoint-lg": "1620px",
        "mantine-breakpoint-xl": "1940px",
      },
    },
  },
};
