import "./App.css";
import { Box, MantineProvider, SimpleGrid } from "@mantine/core";
import TallyCard from "./components/TallyCard.js";
import { useEffect, useState } from "react";
import AddCard from "./components/AddCard.js";

const LOCAL_STORAGE_KEY = "counters";
const DEFAULT_COUNTER = {
  name: "",
  count: 0,
};

function App() {
  const storedCounters = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [counters, setCounters] = useState(
    () => JSON.parse(storedCounters) ?? {}
  );

  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(counters)),
    [counters]
  );

  function addCounter() {
    setCounters((oldCounters) => {
      return {
        ...oldCounters,
        [Math.random()]: DEFAULT_COUNTER,
      };
    });
  }
  function removeCounter(id) {
    setCounters((oldCounters) => {
      const newCounters = { ...oldCounters };
      delete newCounters[id];
      return newCounters;
    });
  }
  function setCounterValue(id, count) {
    setCounters((oldCounters) => {
      return { ...oldCounters, [id]: { ...oldCounters[id], count } };
    });
  }
  function setCounterName(id, name) {
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
      <Box sx={(theme) => ({ padding: theme.spacing.xl })}>
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
      </Box>
    </MantineProvider>
  );
}

export default App;
