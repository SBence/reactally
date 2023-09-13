import { i18n } from "@lingui/core";
import { defaultLocale, locales } from "./i18n.config";

function getLanguageCode(languageString: string) {
  return languageString.split(/-|_/)[0];
}

export async function dynamicActivate() {
  const locale = getLanguageCode(
    navigator.languages.find((language) =>
      locales.includes(getLanguageCode(language)),
    ) ?? defaultLocale,
  );
  const { messages } = await import(`./locales/${locale}.ts`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  i18n.load(locale, messages);
  i18n.activate(locale);
}
