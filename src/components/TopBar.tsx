import { Box, Container, Group, Title } from "@mantine/core";
import { useAppSelector } from "../store/hooks";
import MenuButton from "./menu/MenuButton";

export default function TopBar() {
  const accentColor = useAppSelector((state) => state.accentColor);

  return (
    <Box
      component="header"
      style={(theme) => ({
        height: "64px",
        WebkitUserSelect: "none",
        userSelect: "none",
        borderBottomColor: theme.colors.dark[5],
        borderBottomStyle: "solid",
        borderBottomWidth: "0.8px",
      })}
    >
      <Container
        px="xl"
        size={1280}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Group
          justify="space-between"
          style={{
            height: "100%",
          }}
        >
          <Group gap={0}>
            <Title order={2}>Reac</Title>
            <Title c={accentColor} order={2}>
              Tally
            </Title>
          </Group>
          <MenuButton />
        </Group>
      </Container>
    </Box>
  );
}
