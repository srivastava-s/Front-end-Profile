import { motion } from 'framer-motion'

export function Performance() {
  return (
    <section
      id="performance"
      aria-labelledby="performance-heading"
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 id="performance-heading" className="text-lg font-semibold text-slate-50">
          Performance &amp; Accessibility
        </h2>
        <p className="text-sm text-slate-300/80">
          Focused on fast, accessible, production‑ready frontends with attention to Core Web
          Vitals and real‑world UX.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-sm text-slate-300/80"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/80">
            Lighthouse &amp; Web Vitals
          </h3>
          <p className="text-xs">
            Targets 90+ scores for Performance, Accessibility, and Best Practices using code‑split
            bundles, lazy‑loaded 3D, and minimal layout shift.
          </p>
        </motion.div>
        <motion.div
          className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-sm text-slate-300/80"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/80">
            Bundle &amp; Rendering
          </h3>
          <p className="text-xs">
            Uses Vite, tree‑shaken Three.js imports, and lazy‑loaded scenes to keep JS payloads
            lean while still delivering rich visuals.
          </p>
        </motion.div>
        <motion.div
          className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-sm text-slate-300/80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/80">
            Accessibility
          </h3>
          <p className="text-xs">
            Semantic landmarks, keyboard‑friendly navigation, reduced‑motion awareness, and
            testing using Lighthouse and browser DevTools.
          </p>
        </motion.div>
      </div>
    </section>
  )
}


