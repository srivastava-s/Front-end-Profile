import { motion } from 'framer-motion'

export function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="space-y-6">
      <div className="space-y-2">
        <h2 id="resume-heading" className="text-lg font-semibold text-slate-50">
          Resume
        </h2>
        <p className="text-sm text-slate-300/80">
          Snapshot of experience, skills, and impact as a Frontend Developer / UI Engineer.
        </p>
      </div>
      <motion.div
        className="flex flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-sm text-slate-300/80 md:flex-row"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45 }}
      >
        <div className="flex-1 space-y-2">
          <p className="text-xs text-slate-400">
            A detailed PDF version of my resume is available for download. It highlights frontend
            projects, UI engineering responsibilities, and achievements in more depth.
          </p>
          <a
            href="/Shashank_Kumar_Srivastava_Resume.pdf"
            className="inline-flex w-max items-center gap-1.5 rounded-full border border-sky-400/80 bg-sky-500/20 px-3 py-1.5 text-xs font-medium text-sky-50 transition hover:bg-sky-400/30"
          >
            Download Resume (PDF)
          </a>
        </div>
        <div className="flex-1 rounded-xl border border-slate-800/80 bg-slate-900/70 p-3 text-[0.7rem] text-slate-300/80">
          <p className="mb-1 font-semibold text-slate-100">Frontend Snapshot</p>
          <ul className="space-y-1.5">
            <li>• React &amp; modern JavaScript for UI engineering.</li>
            <li>• API‑driven interfaces and dashboard experiences.</li>
            <li>• Performance‑minded implementation &amp; DX.</li>
          </ul>
        </div>
      </motion.div>
    </section>
  )
}


