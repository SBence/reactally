import { Center, MediaQuery, Paper } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import VIBRATION_STRENGTH from "../../constants/VibrationStrength";
import { useAppDispatch } from "../../store/hooks";
import { addNew } from "../../store/slices/countersSlice";

export default () => {
  const dispatch = useAppDispatch();

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
        onClick={() => dispatch(addNew())}
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
