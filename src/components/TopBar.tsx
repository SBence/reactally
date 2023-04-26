import { Container, Group, Header, Text, Title } from "@mantine/core";
import { useAppSelector } from "../store/hooks";
import MenuButton from "./menu/MenuButton";

export default () => {
  const accentColor = useAppSelector((state) => state.accentColor);

  return (
    <Header
      height={64}
      sx={() => ({
        WebkitUserSelect: "none",
        userSelect: "none",
      })}
    >
      <Container
        px="xl"
        size={1280}
        sx={() => ({
          height: "100%",
        })}
      >
        <Group
          position="apart"
          sx={() => ({
            height: "100%",
          })}
        >
          <Title order={2}>
            <Text component="span">Reac</Text>
            <Text color={accentColor} component="span">
              Tally
            </Text>
          </Title>
          <MenuButton />
        </Group>
      </Container>
    </Header>
  );
};
