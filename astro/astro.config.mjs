// @ts-check
import { defineConfig } from "astro/config";
import fs from "fs";
import vercel from "@astrojs/vercel";

import tailwindcss from "@tailwindcss/vite";

import opengraphImages, { presets } from "astro-opengraph-images";
import { brandedLogo } from "./src/opengraph";

import icon from "astro-icon";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://odia.ar",
  adapter: vercel(),

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
    mdx(),
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
