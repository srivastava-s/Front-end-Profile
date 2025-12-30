import { motion } from 'framer-motion'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#performance', label: 'Performance' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 via-sky-400 to-cyan-300 text-xs font-semibold text-slate-950 shadow-lg shadow-sky-500/40">
            SS
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-100 sm:text-sm">
              Shashank Kumar Srivastava
            </p>
            <p className="text-[0.65rem] text-slate-400 sm:text-[0.7rem]">
              Frontend Developer / UI Engineer
            </p>
          </div>
        </div>
        <nav aria-label="Primary" className="hidden text-xs text-slate-300 sm:flex sm:gap-4">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="rounded-full px-2.5 py-1 text-[0.7rem] text-slate-300/80 transition hover:bg-slate-800/80 hover:text-slate-50"
              whileHover={{ y: -1, transition: { duration: 0.12 } }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
      </div>
    </header>
  )
}


