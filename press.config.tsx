import { defineConfig } from "fumapress";
import { fumadocsMdx } from "fumapress/adapters/mdx";
import { metaSchema, pageSchema } from "fumapress/adapters/mdx/schema";
import { defineDocs } from "fumadocs-mdx/macro";
import { createGlassLayoutPage } from "fumapress/layouts/glass";
import Logo from "./src/assets/images/logo.svg?react";

const GlassLayout = createGlassLayoutPage<typeof config.$context>();

const docs = defineDocs({
  dir: "content",
  docs: {
    async: true,
    schema: pageSchema,
    lastModified: true,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

const config = defineConfig({
  content: docs.toFumadocsSource(),
  mode: "static",
  renderPage: (props) => <GlassLayout {...props} />,
  site: {
    name: "Snippets",
    baseUrl: "https://joeyjiron.com/snippets",
    git: {
      user: "joeyjiron06",
      repo: "snippets",
      branch: "main",
    },
  },

  defaultLayoutProps: {
    nav: {
      title: <Logo className="h-5 w-auto" />,
      url: "/",
    },
  },

  meta: {
    root() {
      return (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Geist:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/snippets/favicon.svg" type="image/svg+xml" />
        </>
      );
    },
  },
}).adapters(fumadocsMdx());

export default config;
