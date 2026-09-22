// Custom landing page — bypasses the default docs layout.
// Files under src/pages are served by fumapress's filesystem router
// and only get the root HTML/CSS shell, not the sidebar/nav.

// The hero backdrop (<Dither />) is a WebGL canvas and therefore a client
// component. This page itself stays a server component — only the backdrop
// is shipped to the browser.
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { createHomeLayout } from "fumapress/layouts/home";
import { Link } from "fumapress/client";
import Dither from "../components/dither";
import ByJoeyJiron from '../assets/images/by-joey-jiron.svg?react'


const GithubUrl = "https://github.com/joeyjiron06/snippets";

const HomeLayout = createHomeLayout({
  layoutProps: {
    className: 'dark',
    githubUrl: GithubUrl,
    themeSwitch: {
      enabled: false,
    },
    searchToggle: {
      enabled: false,
    },
  },
});

function Hero() {
  return (
    <div className="relative flex flex-1 items-center justify-center">
      {/*
        `fixed`, not `absolute`: createHomeLayout() wraps page children in a
        `max-w-[1400px] px-4 py-6 mx-auto` <main>, so an absolutely positioned
        child would be clipped to that column instead of filling the viewport.
        No ancestor sets transform/filter/perspective, so `fixed` resolves
        against the viewport as intended.

        `bg-black` on the wrapper covers the gap before <Canvas> measures its
        container, and keeps the hero text readable if WebGL is unavailable.
        No `pointer-events-none` here — the canvas needs pointer events for
        mouseRadius. Content above sits at z-10 and the nav at z-40, so both
        still receive their own clicks.
      */}
      <div className="fixed inset-0 z-0 bg-black">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          // ~4s per noise cell. Upstream's default (0.05) is ~20s per cell,
          // which reads as a still image. See the unit note in dither.tsx.
          waveSpeed={0.25}
          waveFrequency={3}
          waveAmplitude={0.3}
          colorNum={4}
          pixelSize={2}
          enableMouseInteraction
          mouseRadius={0.125}
        />
      </div>

      {/* Scrim: guarantees hero-text contrast regardless of where the dither
          pattern happens to be bright. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-black/50"
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <div className="space-y-4">
          <a href="https://joeyjiron.com" aria-label="By Joey Jiron" className="flex mx-auto w-24">
            <ByJoeyJiron className="h-5" />
          </a>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Snippets
        </h1>
        </div>
        
        <p className="text-lg text-white/70 text-balance">
          A small, practical, opinionated collection of the JavaScript snippets
          I actually reach for.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/introduction"
            className={buttonVariants({ color: "primary" })}
          >
            Browse snippets
          </Link>
          <a
            href={GithubUrl}
            className={buttonVariants({
              color: "outline",
              className: "border-white/20 text-white hover:bg-white/10",
            })}
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    // The glitch backdrop is always dark, so the footer uses fixed light-on-dark
    // colours rather than the theme tokens, which would go invisible in light mode.
    // `relative z-10` lifts this static element above the fixed z-0 backdrop.
    <footer className="relative z-10 border-t border-white/10 px-6 py-6 text-sm text-white/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <a
            className="underline underline-offset-4 hover:text-white"
            href="https://joeyjiron.com"
          >
            Joey Jiron
          </a>
          .
        </p>
        <nav className="flex items-center gap-4">
          <a
            className="transition-colors hover:text-white"
            href={GithubUrl}
            aria-label="GitHub"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              aria-hidden
              className="size-5 fill-current"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a
            className="transition-colors hover:text-white"
            href="https://x.com/joeyjiron06"
            aria-label="X"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              aria-hidden
              className="size-5 fill-current"
            >
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <HomeLayout className="dark">
      <Hero />
      <SiteFooter />
    </HomeLayout>
  );
}