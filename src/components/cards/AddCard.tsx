import { Center, Paper } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import VIBRATION_STRENGTH from "../../constants/VibrationStrength";
import { useAppDispatch } from "../../store/hooks";
import { addNew } from "../../store/slices/countersSlice";

export default function AddCard({ canHover }: { canHover: boolean }) {
  const dispatch = useAppDispatch();

  return (
    <Paper
      className={canHover ? "add-card-hover-highlight" : undefined}
      shadow="xs"
      radius="md"
      p="md"
      withBorder
      style={{
        cursor: "pointer",
      }}
      onClick={() => dispatch(addNew())}
      onPointerDown={() => navigator.vibrate(VIBRATION_STRENGTH.medium)}
      onPointerUp={() => navigator.vibrate(VIBRATION_STRENGTH.strong)}
    >
      <Center
        style={{
          height: "100%",
        }}
      >
        <IconPlus size={48} />
      </Center>
    </Paper>
  );
}
