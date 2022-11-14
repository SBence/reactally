import { Center, MediaQuery, Paper } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import VIBRATION_STRENGTH from "../constants/VibrationStrength.js";

export default ({ addFunction }) => {
  return (
    <MediaQuery
      query="(hover: hover)"
      styles={(theme) => ({
        "&:hover": {
          backgroundColor: theme.colors.dark[5],
        },
      })}
    >
      <Paper
        shadow="xs"
        radius="md"
        p="md"
        withBorder
        sx={() => ({
          cursor: "pointer",
        })}
        onClick={addFunction}
        onPointerDown={() => navigator.vibrate(VIBRATION_STRENGTH.medium)}
        onPointerUp={() => navigator.vibrate(VIBRATION_STRENGTH.strong)}
      >
        <Center
          sx={() => ({
            height: "100%",
          })}
        >
          <IconPlus size={48} />
        </Center>
      </Paper>
    </MediaQuery>
  );
};
