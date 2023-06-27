import { Menu, useMantineTheme } from "@mantine/core";
import { IconDatabaseExport, IconX } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../store/hooks";
import ColorSelector from "./ColorSelector";
import RestoreButton from "./RestoreButton";

export default function MenuItems({
  setMenuOpened,
  setRemoveModalOpened,
}: {
  setMenuOpened: Dispatch<SetStateAction<boolean>>;
  setRemoveModalOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useMantineTheme();

  const counters = useAppSelector((state) => state.counters);
  const accentColor = useAppSelector((state) => state.accentColor);

  return (
    <>
      <Menu.Label>Accent color</Menu.Label>
      <ColorSelector />
      <Menu.Divider />
      {Object.keys(counters).length ? (
        <Menu.Item
          component="a"
          href={"data:text/json;charset=utf-8," + JSON.stringify(counters)}
          download="ReacTally.json"
          onClick={() => setMenuOpened(false)}
          icon={<IconDatabaseExport size={16} color={accentColor} stroke={2} />}
        >
          Backup
        </Menu.Item>
      ) : (
        <Menu.Item
          disabled
          icon={<IconDatabaseExport size={16} color={accentColor} stroke={2} />}
        >
          Backup
        </Menu.Item>
      )}
      <RestoreButton setMenuOpened={setMenuOpened} />
      <Menu.Divider />
      <Menu.Item
        disabled={!Object.keys(counters).length}
        onClick={() => {
          setRemoveModalOpened(true);
          setMenuOpened(false);
        }}
        icon={<IconX size={16} color={theme.colors.red[5]} stroke={2} />}
      >
        Remove all
      </Menu.Item>
    </>
  );
}
