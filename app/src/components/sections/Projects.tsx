import { motion } from 'framer-motion'
import { projects } from '../../content/portfolio'

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="space-y-6">
      <div className="space-y-2">
        <h2 id="projects-heading" className="text-lg font-semibold text-slate-50">
          Projects
        </h2>
        <p className="text-sm text-slate-300/80">
          Case‑study driven work with a focus on frontend implementation, UX decisions, and
          measurable outcomes.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 shadow-sm shadow-slate-900/60"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12)_0,_transparent_60%)]" />
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-50">{project.title}</h3>
                <p className="text-[0.7rem] text-slate-400">{project.role}</p>
              </div>
              <div className="h-10 w-10 rounded-full border border-sky-400/40 bg-gradient-to-br from-sky-500/40 via-indigo-500/30 to-cyan-400/40 shadow-inner shadow-sky-400/40" />
            </div>
            <p className="mb-3 text-xs text-slate-300/80">{project.summary}</p>
            <ul className="mb-3 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-slate-700/80 bg-slate-900/70 px-2 py-1 text-[0.68rem] text-slate-300/80"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-2 text-[0.7rem]">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-700/80 px-2.5 py-1 text-slate-200/90 transition hover:border-sky-400/80 hover:text-sky-100"
                >
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-sky-400/80 bg-sky-500/20 px-2.5 py-1 text-slate-50 transition hover:bg-sky-400/30"
                >
                  Live Demo
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}


