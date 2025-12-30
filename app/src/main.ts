import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { PageShell } from './components/layout/PageShell'
import { HeroCanvas } from './components/three/HeroCanvas'

const rootElement = document.getElementById('app') as HTMLElement

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <PageShell>
      <main className="flex flex-1 flex-col gap-16 py-10">
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] md:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300/80">
              Frontend Engineering · React · Three.js
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.7rem]">
              I craft modern, performant web interfaces that blend{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
                cinematic 3D
              </span>{' '}
              with clear, recruiter‑friendly UX.
            </h1>
            <p className="max-w-xl text-sm text-slate-300/80 sm:text-base">
              Frontend‑focused Software Engineer specializing in React, UI engineering, and
              performance‑optimized experiences. Subtle WebGL visuals, strong fundamentals, and
              clean abstractions.
            </p>
          </div>
          <HeroCanvas />
        </section>
      </main>
    </PageShell>
  </React.StrictMode>,
)
