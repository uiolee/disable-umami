// eslint-disable-next-line n/no-unpublished-import
import { js, ts } from "eslint-config-uiolee/configs";

import globals from "globals";

export default [
  ...js,
  ...ts,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.webextensions,
      },
    },
  },
  { ignores: ["build/**", "dist/**"] },
  { files: ["src"] },
];
