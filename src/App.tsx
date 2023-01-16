import "./App.css";
import { Container, MantineProvider, SimpleGrid } from "@mantine/core";
import TallyCard from "./components/TallyCard";
import { useEffect, useState } from "react";
import AddCard from "./components/AddCard";
import { Counters } from "./interfaces/counter";
import { v4 as uuidv4 } from "uuid";
import TopBar from "./components/TopBar";
import { NotificationsProvider } from "@mantine/notifications";

const LOCAL_STORAGE_KEY = "counters";
const DEFAULT_COUNTER = {
  name: "",
  count: 0,
};

function App() {
  const storedCounters = localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}";
  const [counters, setCounters] = useState<Counters>(() =>
    JSON.parse(storedCounters)
  );

  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(counters)),
    [counters]
  );

  function addCounter() {
    setCounters((oldCounters) => {
      return {
        ...oldCounters,
        [uuidv4()]: DEFAULT_COUNTER,
      };
    });
  }
  function removeCounter(id: string) {
    setCounters((oldCounters) => {
      const newCounters = { ...oldCounters };
      delete newCounters[id];
      return newCounters;
    });
  }
  function setCounterValue(id: string, count: number) {
    setCounters((oldCounters) => {
      return { ...oldCounters, [id]: { ...oldCounters[id], count } };
    });
  }
  function setCounterName(id: string, name: string) {
    setCounters((oldCounters) => {
      return { ...oldCounters, [id]: { ...oldCounters[id], name } };
    });
  }

  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        breakpoints: {
          xs: 680,
          sm: 980,
          md: 1300,
          lg: 1620,
          xl: 1940,
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider>
        <TopBar counters={counters} setCounters={setCounters} />
        <Container
          size={1920}
          px="xl"
          sx={(theme) => ({
            paddingTop: theme.spacing.xl,
            paddingBottom: theme.spacing.xl,
          })}
        >
          <SimpleGrid
            breakpoints={[
              { minWidth: "xs", cols: 2 },
              { minWidth: "sm", cols: 3 },
              { minWidth: "md", cols: 4 },
              { minWidth: "lg", cols: 5 },
              { minWidth: "xl", cols: 6 },
            ]}
          >
            {Object.keys(counters).map((counterId) => (
              <TallyCard
                key={counterId}
                name={counters[counterId].name}
                setName={(name) => setCounterName(counterId, name)}
                count={counters[counterId].count}
                setCount={(count) => setCounterValue(counterId, count)}
                removeFunction={() => removeCounter(counterId)}
              />
            ))}
            <AddCard addFunction={addCounter} />
          </SimpleGrid>
        </Container>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
