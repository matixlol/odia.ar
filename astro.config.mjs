// @ts-check
import { defineConfig } from "astro/config";
import fs from "fs";
import vercel from "@astrojs/vercel";
import embeds from "astro-embed/integration";

import tailwindcss from "@tailwindcss/vite";

import opengraphImages, { presets } from "astro-opengraph-images";
import { brandedLogo } from "./src/opengraph";

import icon from "astro-icon";
import markdoc from "@astrojs/markdoc";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://odia.ar",
  output: "server",
  adapter: vercel(),

  build: { inlineStylesheets: "always" },

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // ssr instead of rollupOptions
      external: ["@resvg/resvg-js"],
    },
    build: {
      rollupOptions: {
        external: ["@resvg/resvg-js", "astro-opengraph-images"],
      },
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },

  integrations: [
    embeds(),
    markdoc({ allowHTML: true }),
    react(),
    keystatic(),
    opengraphImages({
      options: {
        fonts: [
          {
            name: "Merriweather",
            weight: 400,
            style: "normal",
            data: fs.readFileSync(
              "node_modules/@fontsource/merriweather/files/merriweather-latin-600-normal.woff"
            ),
          },
        ],
      },
      render: brandedLogo,
    }),
    icon(),
  ],
});
