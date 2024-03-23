import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import astroI18next from "astro-i18next";

import vue from "@astrojs/vue";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), astroI18next(), vue(), react(), svelte()],
  server: {
    port: 3000,
  }
});