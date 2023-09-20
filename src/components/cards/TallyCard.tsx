import {
  ActionIcon,
  Center,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import VIBRATION_STRENGTH from "../../constants/VibrationStrength";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  decrement,
  increment,
  remove,
  reset,
  setName,
} from "../../store/slices/countersSlice";

const MAX_COUNT = 99999;
const MAX_NAME_LENGTH = 32;

export default function TallyCard({
  id,
  canHover,
}: {
  id: string;
  canHover: boolean;
}) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const accentColor = useAppSelector((state) => state.accentColor);
  const count = useAppSelector((state) => state.counters[id].count);
  const name = useAppSelector((state) => state.counters[id].name);

  useEffect(() => {
    if (editMode && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [editMode]);

  return (
    <Paper
      shadow="xs"
      radius="md"
      p="md"
      style={(theme) => ({
        backgroundColor: theme.colors.dark[6],
        WebkitUserSelect: "none",
        userSelect: "none",
      })}
      onContextMenu={(event) => {
        event.preventDefault();
      }}
    >
      <Group justify="space-between">
        {editMode ? (
          <TextInput
            ref={nameInputRef}
            value={nameInput}
            onChange={(event) => {
              setNameInput(event.currentTarget.value);
            }}
            style={{
              flexBasis: 0,
              flexGrow: 1,
              height: "34px",
            }}
            maxLength={MAX_NAME_LENGTH}
            enterKeyHint="done"
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === "Escape") {
                if (event.key === "Enter")
                  dispatch(setName({ id, name: nameInput }));
                setEditMode(false);
              }
            }}
          />
        ) : (
          <Title
            order={3}
            style={{
              flexBasis: 0,
              flexGrow: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Title>
        )}
        <ActionIcon
          color={editMode ? "green.3" : "gray"}
          variant="subtle"
          size="lg"
          radius="md"
          onClick={() => {
            editMode
              ? dispatch(setName({ id, name: nameInput }))
              : setNameInput(name);
            setEditMode(!editMode);
          }}
          onPointerDown={() => navigator.vibrate(VIBRATION_STRENGTH.weak)}
          onPointerUp={() => navigator.vibrate(VIBRATION_STRENGTH.medium)}
        >
          {editMode ? <IconCheck size={26} /> : <IconEdit size={26} />}
        </ActionIcon>
        <ActionIcon
          color="red.5"
          variant="subtle"
          size="lg"
          radius="md"
          onClick={() => dispatch(remove({ id }))}
          onPointerDown={() => navigator.vibrate(VIBRATION_STRENGTH.medium)}
          onPointerUp={() => navigator.vibrate(VIBRATION_STRENGTH.strong)}
        >
          <IconTrash size={26} />
        </ActionIcon>
      </Group>
      <Center>
        <Text fz="72pt" fw={700} c={accentColor}>
          {count}
        </Text>
      </Center>
      <Group justify="space-between" grow>
        <ActionIcon
          className={`${
            count && `active-red ${canHover && "tally-card-hover-highlight"}`
          }`}
          onClick={() => dispatch(decrement({ id }))}
          onPointerDown={() => navigator.vibrate(VIBRATION_STRENGTH.weak)}
          onContextMenu={() => dispatch(reset({ id }))}
          onPointerUp={() => navigator.vibrate(VIBRATION_STRENGTH.medium)}
          disabled={!count}
          color="dark.4"
          size="xl"
          radius="md"
          variant="filled"
          style={{
            height: "64px",
          }}
        >
          <IconChevronDown size={48} />
        </ActionIcon>
        <ActionIcon
          className={`${
            count < MAX_COUNT &&
            `active-green ${canHover && "tally-card-hover-highlight"}`
          }`}
          onClick={() => dispatch(increment({ id }))}
          onPointerDown={() => navigator.vibrate(VIBRATION_STRENGTH.weak)}
          onPointerUp={() => navigator.vibrate(VIBRATION_STRENGTH.medium)}
          disabled={count >= MAX_COUNT}
          color="dark.4"
          size="xl"
          radius="md"
          variant="filled"
          style={{
            height: "64px",
          }}
        >
          <IconChevronUp size={48} />
        </ActionIcon>
      </Group>
    </Paper>
  );
}
