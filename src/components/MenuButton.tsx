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

export default ({
  counters,
  setCounters,
}: {
  counters: Counters;
  setCounters: Dispatch<SetStateAction<Counters>>;
}) => {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      transition="scale-y"
      position="top-end"
      width={160}
      closeOnItemClick={false}
      withinPortal
    >
      <Menu.Target>
        <Button
          color="teal.4"
          variant="outline"
          rightIcon={<IconChevronDown size={18} stroke={1.5} />}
          pr={12}
          loading={loading}
          loaderPosition="right"
        >
          Options
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
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
            setOpened(false);
            setLoading(false);
          }}
          accept="application/json"
        >
          {(props) => (
            <Menu.Item
              icon={
                <IconDatabaseImport
                  size={16}
                  color={theme.colors.teal[4]}
                  stroke={1.5}
                />
              }
              {...props}
            >
              Import
            </Menu.Item>
          )}
        </FileButton>

        <Menu.Item
          component="a"
          href={"data:text/json;charset=utf-8," + JSON.stringify(counters)}
          download="ReacTally.json"
          onClick={() => setOpened(false)}
          icon={
            <IconDatabaseExport
              size={16}
              color={theme.colors.teal[4]}
              stroke={1.5}
            />
          }
        >
          Export
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          disabled={!Object.keys(counters).length}
          onClick={() => {
            setOpened(false);
            setCounters({});
            showNotification({
              message: "Removed all counters.",
            });
          }}
          icon={<IconX size={16} color={theme.colors.red[5]} stroke={1.5} />}
        >
          Remove all
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
