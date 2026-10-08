/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// getViteConfig gives the tests the same path aliases (@config, @utils) as the site.
export default getViteConfig({
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
