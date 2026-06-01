import en from "./en.json";
import zh from "./zh.json";

const translations: Record<string, Record<string, any>> = { en, zh };

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;
type DotNestedKeys<T> = T extends object
  ? { [K in Extract<keyof T, string>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}` }[Extract<
      keyof T,
      string
    >]
  : "";

export function getLangFromUrl(url: URL): string {
  const [, lang] = url.pathname.split("/");
  if (lang && ["en", "zh"].includes(lang)) return lang;
  return "en";
}

export function useTranslations(lang: string) {
  const t = translations[lang] ?? translations.en;

  return {
    t(key: string): string {
      const keys = key.split(".");
      let result: any = t;
      for (const k of keys) {
        if (result === undefined) return key;
        result = result[k];
      }
      return result ?? key;
    },
    lang,
  };
}

export function getLocalePaths(lang: string, pathname: string): Array<{ lang: string; path: string }> {
  const cleanPath = pathname.replace(/^\/(en|zh)/, "") || "/";
  return [
    { lang: "en", path: `/en${cleanPath}` },
    { lang: "zh", path: `/zh${cleanPath}` },
  ];
}
