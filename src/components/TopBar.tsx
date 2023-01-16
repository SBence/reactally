import { Container, Group, Header, Text, Title } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { Counters } from "../interfaces/counter";
import MenuButton from "./MenuButton";

export default ({
  counters,
  setCounters,
}: {
  counters: Counters;
  setCounters: Dispatch<SetStateAction<Counters>>;
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
            <Text color="teal.4" component="span">
              Tally
            </Text>
          </Title>
          <MenuButton counters={counters} setCounters={setCounters} />
        </Group>
      </Container>
    </Header>
  );
};
