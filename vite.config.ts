import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import press from "fumapress/vite";
import { fumadocsMdx } from "fumadocs-mdx/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    press({
      basePath: "/snippets/",
    }),
    fumadocsMdx(),
    tailwindcss(),
    svgr(),
  ],
});
