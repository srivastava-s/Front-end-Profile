import { motion } from 'framer-motion'
import { HeroCanvas } from '../three/HeroCanvas'

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] md:items-center"
    >
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300/80">
          Frontend Engineering · React · Three.js
        </p>
        <h1
          id="hero-heading"
          className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.7rem]"
        >
          I craft modern, performant web interfaces that blend{' '}
          <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
            cinematic 3D
          </span>{' '}
          with clear, recruiter‑friendly UX.
        </h1>
        <p className="max-w-xl text-sm text-slate-300/80 sm:text-base">
          Frontend‑focused Software Engineer specializing in React, UI engineering, and
          performance‑optimized experiences. Subtle WebGL visuals, strong fundamentals, and clean
          abstractions.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        <HeroCanvas />
      </motion.div>
    </section>
  )
}


