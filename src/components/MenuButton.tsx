import { Button, FileButton, Menu, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconChevronDown,
  IconDatabaseImport,
  IconDatabaseExport,
  IconX,
} from "@tabler/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { Counters } from "../interfaces/counter";
import RemoveModal from "./RemoveModal";
import ColorSelector from "./ColorSelector";

export default ({
  counters,
  setCounters,
  accentColor,
  setAccentColor,
}: {
  counters: Counters;
  setCounters: Dispatch<SetStateAction<Counters>>;
  accentColor: string;
  setAccentColor: Dispatch<SetStateAction<string>>;
}) => {
  const theme = useMantineTheme();

  const [menuOpened, setMenuOpened] = useState(false);
  const [removeModalOpened, setRemoveModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <RemoveModal
        opened={removeModalOpened}
        setOpened={setRemoveModalOpened}
        setCounters={setCounters}
      />
      <Menu
        opened={menuOpened}
        onChange={setMenuOpened}
        transition="scale-y"
        position="top-end"
        width={200}
        closeOnItemClick={false}
        withinPortal
      >
        <Menu.Target>
          <Button
            sx={{ color: accentColor, borderColor: accentColor }}
            variant="outline"
            rightIcon={<IconChevronDown size={18} stroke={2} />}
            pr={12}
            loading={loading}
            loaderPosition="right"
          >
            Options
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Accent color</Menu.Label>
          <Menu.Item
            component={ColorSelector}
            accentColor={accentColor}
            setAccentColor={setAccentColor}
          ></Menu.Item>
          <Menu.Divider />
          <Menu.Label>Backup</Menu.Label>
          <FileButton
            onChange={async (uploadedFile) => {
              setLoading(true);
              const uploadedText = await uploadedFile?.text();
              if (!uploadedText)
                return showNotification({
                  title: "Failed to import file.",
                  message: "Non-text file uploaded.",
                  color: "red",
                });
              try {
                const uploadedJson = JSON.parse(uploadedText);
                setCounters((oldCounters) => {
                  return { ...oldCounters, ...uploadedJson };
                });
                showNotification({
                  message: "Successfully imported file.",
                  color: "green",
                });
              } catch {
                showNotification({
                  title: "Failed to import file.",
                  message: "Invalid JSON file uploaded.",
                  color: "red",
                });
              }
              setMenuOpened(false);
              setLoading(false);
            }}
            accept="application/json"
          >
            {(props) => (
              <Menu.Item
                icon={
                  <IconDatabaseImport
                    size={16}
                    color={accentColor}
                    stroke={2}
                  />
                }
                {...props}
              >
                Import
              </Menu.Item>
            )}
          </FileButton>

          {Object.keys(counters).length ? (
            <Menu.Item
              component="a"
              href={"data:text/json;charset=utf-8," + JSON.stringify(counters)}
              download="ReacTally.json"
              onClick={() => setMenuOpened(false)}
              icon={
                <IconDatabaseExport size={16} color={accentColor} stroke={2} />
              }
            >
              Export
            </Menu.Item>
          ) : (
            <Menu.Item
              disabled
              icon={
                <IconDatabaseExport size={16} color={accentColor} stroke={2} />
              }
            >
              Export
            </Menu.Item>
          )}
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
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
