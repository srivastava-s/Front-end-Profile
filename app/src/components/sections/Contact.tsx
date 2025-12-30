import { motion } from 'framer-motion'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="space-y-6">
      <div className="space-y-2">
        <h2 id="contact-heading" className="text-lg font-semibold text-slate-50">
          Contact
        </h2>
        <p className="text-sm text-slate-300/80">
          Open to frontend roles, UI engineering work, and collaborations on modern web
          experiences.
        </p>
      </div>
      <motion.div
        className="grid gap-4 md:grid-cols-3"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4 }}
      >
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-sm text-slate-300/80">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/80">
            Email
          </p>
          <a
            href="mailto:work.shashank.srivastava@gmail.com"
            className="break-all text-xs text-sky-200 hover:text-sky-100"
          >
            work.shashank.srivastava@gmail.com
          </a>
        </div>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-sm text-slate-300/80">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/80">
            LinkedIn
          </p>
          <a
            href="https://www.linkedin.com/in/shashank-kumar-srivastava-/"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-sky-200 hover:text-sky-100"
          >
            Connect on LinkedIn
          </a>
        </div>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-sm text-slate-300/80">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/80">
            GitHub
          </p>
          <a
            href="https://github.com/srivastava-s"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-sky-200 hover:text-sky-100"
          >
            github.com/srivastava-s
          </a>
        </div>
      </motion.div>
    </section>
  )
}


