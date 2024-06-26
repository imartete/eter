import type { LinguiConfig } from "@lingui/conf";
import { locales } from "./src/i18n.ts";

const config: LinguiConfig = {
  locales,
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}",
      include: ["src"],
    },
  ],
  compileNamespace: "ts",
};

export default config;
