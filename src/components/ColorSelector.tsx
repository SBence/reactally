import { CheckIcon, ColorSwatch, Group, useMantineTheme } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

export default ({
  accentColor,
  setAccentColor,
}: {
  accentColor: string;
  setAccentColor: Dispatch<SetStateAction<string>>;
}) => {
  const theme = useMantineTheme();
  const swatches = Object.keys(theme.colors).map((color) => (
    <ColorSwatch
      component="button"
      size={16}
      key={color}
      color={theme.colors[color][5]}
      onClick={() => setAccentColor(theme.colors[color][5])}
    >
      {theme.colors[color][5] === accentColor && <CheckIcon width={8} />}
    </ColorSwatch>
  ));

  return (
    <Group
      position="center"
      spacing="xs"
      sx={(theme) => ({
        paddingTop: theme.spacing.xs,
        paddingBottom: theme.spacing.xs,
      })}
    >
      {swatches}
    </Group>
  );
};
