import { FileButton, Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDatabaseImport } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { appendSet } from "../../store/slices/countersSlice";

export default function RestoreButton({
  setMenuOpened,
}: {
  setMenuOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();

  const accentColor = useAppSelector((state) => state.accentColor);

  return (
    <FileButton
      onChange={async (uploadedFile) => {
        const uploadedText = await uploadedFile?.text();
        if (!uploadedText)
          return notifications.show({
            title: "Failed to restore backup.",
            message: "Non-text file uploaded.",
            color: "red",
          });
        try {
          const uploadedJson = JSON.parse(uploadedText);
          dispatch(appendSet({ counters: uploadedJson }));
          notifications.show({
            message: "Successfully restored backup.",
            color: "green",
          });
        } catch {
          notifications.show({
            title: "Failed to restore backup.",
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
          Restore
        </Menu.Item>
      )}
    </FileButton>
  );
}
