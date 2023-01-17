import { Button, Group, Modal, Space, ThemeIcon, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons";
import { Dispatch, SetStateAction } from "react";
import { Counters } from "../../../interfaces/counter";

export default ({
  opened,
  setOpened,
  setCounters,
}: {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  setCounters: Dispatch<SetStateAction<Counters>>;
}) => {
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
            setCounters({});
            showNotification({
              message: "Removed all counters.",
            });
          }}
        >
          Remove
        </Button>
      </Group>
    </Modal>
  );
};
