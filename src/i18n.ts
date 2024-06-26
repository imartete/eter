import { i18n } from "@lingui/core";

export const locales = ["en", "uk"];
export const defaultLocale = "en";

function getLanguageCode(languageString: string) {
  return languageString.split(/-|_/)[0];
}

export async function dynamicActivate() {
  const locale = getLanguageCode(
    navigator.languages.find((language) =>
      locales.includes(getLanguageCode(language)),
    ) ?? defaultLocale,
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { messages } = await import(`./locales/${locale}.ts`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  i18n.load(locale, messages);
  i18n.activate(locale);
}
