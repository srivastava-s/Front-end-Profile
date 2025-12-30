import type { PropsWithChildren } from 'react'
import { Header } from './Header'

export function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#1e293b_0,_#020617_45%,_#000_100%)]" />
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
        <Header />
        {children}
      </div>
    </div>
  )
}


