import { CheckIcon, ColorSwatch, Group, useMantineTheme } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeTo } from "../../store/slices/accentColorSlice";

export default function ColorSelector() {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();

  const accentColor = useAppSelector((state) => state.accentColor);

  const swatches = Object.keys(theme.colors).map((color) => (
    <ColorSwatch
      component="button"
      size={16}
      key={color}
      color={theme.colors[color][5]}
      onClick={() => dispatch(changeTo(theme.colors[color][5]))}
    >
      {theme.colors[color][5] === accentColor && <CheckIcon width={8} />}
    </ColorSwatch>
  ));

  return (
    <Group
      justify="center"
      gap="xs"
      style={(theme) => ({
        paddingTop: theme.spacing.xs,
        paddingBottom: theme.spacing.xs,
      })}
    >
      {swatches}
    </Group>
  );
}
