import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { PageShell } from './components/layout/PageShell'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Performance } from './components/sections/Performance'
import { Resume } from './components/sections/Resume'
import { Contact } from './components/sections/Contact'

const rootElement = document.getElementById('app') as HTMLElement

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <PageShell>
      <main className="flex flex-1 flex-col gap-16 py-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Performance />
        <Resume />
        <Contact />
      </main>
    </PageShell>
  </React.StrictMode>,
)


