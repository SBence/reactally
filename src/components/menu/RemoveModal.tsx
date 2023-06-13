import { Button, Group, Modal, Space, ThemeIcon, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../store/hooks";
import { removeAll } from "../../store/slices/countersSlice";

export default function RemoveModal({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      size="auto"
      withCloseButton={false}
    >
      <Group>
        <ThemeIcon variant="light" size="xl" radius="xl" color="red">
          <IconTrash size={24} />
        </ThemeIcon>
        <Title order={4} align="center">
          Remove all counters?
        </Title>
      </Group>
      <Space h="xl" />
      <Group position="right">
        <Button color="gray" onClick={() => setOpened(false)}>
          Cancel
        </Button>
        <Button
          color="red"
          onClick={() => {
            setOpened(false);
            dispatch(removeAll());
            notifications.show({
              message: "Removed all counters.",
            });
          }}
        >
          Remove
        </Button>
      </Group>
    </Modal>
  );
}
