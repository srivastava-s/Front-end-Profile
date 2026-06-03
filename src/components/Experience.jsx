import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences } from '../data/experience';
import { useReducedMotion } from '../hooks/useReducedMotion';
import FadeUp from './FadeUp';
import './Experience.css';

function TimelineDot({ isInView, prefersReduced }) {
  return (
    <motion.div
      className="timeline-dot"
      initial={{ scale: 0 }}
      animate={isInView ? { scale: [0, 1.2, 1] } : {}}
      transition={{ duration: prefersReduced ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    />
  );
}

function ExperienceCard({ exp, index, featured = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReduced = useReducedMotion();
  const isEven = index % 2 === 1;

  return (
    <div className="timeline-item" ref={ref}>
      <TimelineDot isInView={isInView} prefersReduced={prefersReduced} />
      <motion.article
        className="experience-card glass-card"
        initial={{ opacity: 0, x: prefersReduced ? 0 : (isEven ? 40 : -40) }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={{
          y: -6,
          boxShadow: '0 20px 60px rgba(167, 139, 250, 0.15)',
        }}
      >
        <div className="card-header-row">
          <h3>{exp.title}</h3>
          {featured && (
            <motion.span
              className="featured-badge"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 15 }}
            >
              Featured
            </motion.span>
          )}
        </div>
        <p className="tagline">{exp.tagline}</p>
        <ul>
          {exp.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

export default function Experience() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: '-100px' });
  const prefersReduced = useReducedMotion();

  return (
    <section id="experience" className="section">
      <div className="container">
        <FadeUp>
          <header className="section-header">
            <h2>
              Selected Frontend Experience
              <motion.span
                className="section-underline"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </h2>
            <p>UI‑focused work across dashboards, AI tools, and browser extensions.</p>
          </header>
        </FadeUp>

        <div className="timeline" ref={lineRef}>
          {/* Vertical timeline line */}
          <motion.div
            className="timeline-line"
            initial={{ scaleY: 0 }}
            animate={lineInView ? { scaleY: 1 } : {}}
            transition={{
              duration: prefersReduced ? 0 : 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />

          {experiences.map((exp, i) => (
            <ExperienceCard
              key={exp.title}
              exp={exp}
              index={i}
              featured={exp.title === 'DeepInspect AI'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
