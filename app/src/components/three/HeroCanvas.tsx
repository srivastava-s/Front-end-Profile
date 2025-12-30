import { lazy, Suspense, useEffect, useState } from 'react'

const LazyThreeScene = lazy(() => import('./ThreeScene'))

export function HeroCanvas() {
  const [shouldRender3D, setShouldRender3D] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cores = navigator.hardwareConcurrency ?? 4

    if (!prefersReducedMotion && cores >= 4) {
      setShouldRender3D(true)
    }
  }, [])

  if (!shouldRender3D) {
    return (
      <div className="h-[320px] w-full rounded-3xl border border-slate-800/70 bg-[radial-gradient(circle_at_top,_#1d4ed8_0,_#020617_60%,_#000_100%)] opacity-80" />
    )
  }

  return (
    <div className="h-[320px] w-full overflow-hidden rounded-3xl border border-slate-800/70 bg-black/60">
      <Suspense
        fallback={
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_#1d4ed8_0,_#020617_60%,_#000_100%)]" />
        }
      >
        <LazyThreeScene />
      </Suspense>
    </div>
  )
}


