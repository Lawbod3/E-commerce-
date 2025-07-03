import { defineConfig } from "vitest/config";
import path from "path";

export default {
  test: {
    sequence: {
      setupFiles: ["./vitest.setup.js"],
    },
    isolate: false,
  },
};
