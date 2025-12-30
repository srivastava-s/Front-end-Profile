import { motion } from 'framer-motion'

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="space-y-6">
      <div className="space-y-2">
        <h2 id="about-heading" className="text-lg font-semibold text-slate-50">
          About
        </h2>
        <p className="text-sm text-slate-300/80">
          I&apos;m a Frontend Developer / UI Engineer focused on crafting responsive, accessible,
          and performant interfaces. I bring competitive programming roots and strong fundamentals
          in data structures and algorithms into how I design state, data flows, and UI behavior.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.2fr)]">
        <motion.div
          className="space-y-3 text-sm text-slate-300/80"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p>
            I focus on building UIs that remain stable under real-world conditions — from Chrome
            extensions and dashboards to AI‑powered tools. My work emphasizes clear information
            hierarchy, smooth interaction states, and performance‑minded implementation details.
          </p>
          <p>
            I enjoy collaborating with designers and product teams, translating ideas into
            components, and iterating quickly while maintaining a high bar for code quality and
            accessibility.
          </p>
        </motion.div>
        <motion.div
          className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 text-xs text-slate-300/80 shadow-lg shadow-sky-900/40"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-300/80">
            UI Engineering Principles
          </p>
          <ul className="space-y-1.5">
            <li>• Ship fast, keep interactions smooth, and avoid layout shifts.</li>
            <li>• Use 3D &amp; motion to support comprehension, never to distract.</li>
            <li>• Design for keyboard usage, screen readers, and reduced motion.</li>
            <li>• Structure components for reusability and maintainability.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}


