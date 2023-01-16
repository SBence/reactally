import { Container, Group, Header, Text, Title } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { Counters } from "../interfaces/counter";
import MenuButton from "./MenuButton";

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
  return (
    <Header height={64}>
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
          <MenuButton
            counters={counters}
            setCounters={setCounters}
            accentColor={accentColor}
            setAccentColor={setAccentColor}
          />
        </Group>
      </Container>
    </Header>
  );
};
