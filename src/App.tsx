import { Container, SimpleGrid } from "@mantine/core";
import TallyCard from "./components/cards/TallyCard";
import AddCard from "./components/cards/AddCard";
import TopBar from "./components/TopBar";
import { useAppSelector } from "./store/hooks";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useEffect } from "react";
import { dynamicActivate } from "./i18n";

export default function App() {
  const counters = useAppSelector((state) => state.counters);

  useEffect(() => {
    void dynamicActivate();
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <TopBar />
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
          {Object.keys(counters).map((id) => (
            <TallyCard key={id} id={id} />
          ))}
          <AddCard />
        </SimpleGrid>
      </Container>
    </I18nProvider>
  );
}
