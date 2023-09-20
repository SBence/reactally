import { Container, SimpleGrid } from "@mantine/core";
import TallyCard from "./components/cards/TallyCard";
import AddCard from "./components/cards/AddCard";
import TopBar from "./components/TopBar";
import { useAppSelector } from "./store/hooks";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useEffect } from "react";
import { dynamicActivate } from "./i18n";
import { useMediaQuery } from "@mantine/hooks";

export default function App() {
  const counters = useAppSelector((state) => state.counters);

  const canHover = useMediaQuery("(hover: hover)") ?? false;

  useEffect(() => {
    void dynamicActivate();
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <TopBar />
      <Container
        size={1920}
        px="xl"
        style={(theme) => ({
          paddingTop: theme.spacing.xl,
          paddingBottom: theme.spacing.xl,
        })}
      >
        <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
          {Object.keys(counters).map((id) => (
            <TallyCard key={id} id={id} canHover={canHover} />
          ))}
          <AddCard canHover={canHover} />
        </SimpleGrid>
      </Container>
    </I18nProvider>
  );
}
