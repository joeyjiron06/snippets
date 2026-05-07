import Link from 'next/link'
import homeContent from '@/content/site/home.json'
import PixelBlast from '@/components/pixel-blast'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function HomePage() {
  return (
    <div className="relative isolate flex min-h-dvh flex-col">
      <div className="fixed inset-0 -z-10 h-dvh w-screen opacity-50">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#e2c6b2"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples={false}
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.35}
          transparent
        />
      </div>

      <div className="relative z-10 flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-16">
          <div className="max-w-3xl space-y-6 rounded-[1.5rem] border bg-fd-background/70 p-8 shadow-sm backdrop-blur-sm sm:p-10 lg:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-fd-muted-foreground">
              {homeContent.eyebrow}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              {homeContent.title}
            </h1>
            <p className="text-lg text-fd-muted-foreground">{homeContent.description}</p>
            <p className="max-w-2xl text-fd-muted-foreground">{homeContent.secondaryDescription}</p>
            <div className="pt-2">
              <Link
                href="/browse"
                className="inline-flex rounded-full bg-fd-primary px-5 py-3 text-sm font-medium text-fd-primary-foreground">
                {homeContent.ctaLabel}
              </Link>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
