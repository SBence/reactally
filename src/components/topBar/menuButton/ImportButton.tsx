import { FileButton, Menu } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconDatabaseImport } from "@tabler/icons";
import { Dispatch, SetStateAction } from "react";
import { Counters } from "../../../interfaces/counter";

export default ({
  setCounters,
  setMenuOpened,
  accentColor,
}: {
  setCounters: Dispatch<SetStateAction<Counters>>;
  setMenuOpened: Dispatch<SetStateAction<boolean>>;
  accentColor: string;
}) => {
  return (
    <FileButton
      onChange={async (uploadedFile) => {
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
      }}
      accept="application/json"
    >
      {(props) => (
        <Menu.Item
          icon={<IconDatabaseImport size={16} color={accentColor} stroke={2} />}
          {...props}
        >
          Import
        </Menu.Item>
      )}
    </FileButton>
  );
};
