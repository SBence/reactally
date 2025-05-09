import { Trans } from "@lingui/react/macro";
import { t } from "@lingui/core/macro";
import { FileButton, Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDatabaseImport } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { appendSet } from "../../store/slices/countersSlice";
import safeLoadJson from "../../utils/safeLoadJson";
import isCounters from "../../types/predicates/isCounters";

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
        if (!uploadedText) {
          notifications.show({
            title: t`Failed to restore backup.`,
            message: t`Non-text file uploaded.`,
            color: "red",
          });
          return;
        }
        try {
          const uploadedJson = safeLoadJson(uploadedText, isCounters);
          if (!uploadedJson) throw new Error();
          dispatch(appendSet({ counters: uploadedJson }));
          notifications.show({
            message: t`Successfully restored backup.`,
            color: "green",
          });
        } catch {
          notifications.show({
            title: t`Failed to restore backup.`,
            message: t`Invalid JSON file uploaded.`,
            color: "red",
          });
        }
        setMenuOpened(false);
      }}
      accept="application/json"
    >
      {(props) => (
        <Menu.Item
          leftSection={
            <IconDatabaseImport size={16} color={accentColor} stroke={2} />
          }
          {...props}
        >
          <Trans>Restore</Trans>
        </Menu.Item>
      )}
    </FileButton>
  );
}
