import { motion } from 'framer-motion'

const skillGroups = [
  {
    title: 'Core Frontend Engineering',
    items: ['Semantic HTML', 'Modern CSS', 'JavaScript (ES6+)', 'Responsive layouts'],
  },
  {
    title: 'React & State',
    items: ['React', 'Component architecture', 'API-driven UIs', 'State modeling'],
  },
  {
    title: 'CSS & Motion',
    items: ['TailwindCSS', 'Animation patterns', 'Micro‑interactions', 'Design systems'],
  },
  {
    title: 'Performance',
    items: ['Lazy loading', 'Bundle awareness', 'Web Vitals mindset', 'Profiling UIs'],
  },
  {
    title: 'Testing & Tooling',
    items: ['TypeScript basics', 'Git & GitHub', 'Vite', 'Lighthouse / DevTools'],
  },
  {
    title: 'Collaboration',
    items: ['Working with designers', 'Feature specs', 'Code reviews', 'Mentoring'],
  },
]

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="space-y-6">
      <div className="space-y-2">
        <h2 id="skills-heading" className="text-lg font-semibold text-slate-50">
          Skills
        </h2>
        <p className="text-sm text-slate-300/80">
          Focused on frontend craftsmanship, performance, and collaborative UI delivery.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.title}
            className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 shadow-sm shadow-slate-900/40"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
          >
            <h3 className="mb-2 text-sm font-medium text-slate-100">{group.title}</h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-slate-700/80 bg-slate-900/60 px-2 py-1 text-[0.7rem] text-slate-300/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


