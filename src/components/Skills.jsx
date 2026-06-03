import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../data/skills';
import { useReducedMotion } from '../hooks/useReducedMotion';
import FadeUp from './FadeUp';
import './Skills.css';

function SkillBar({ name, level, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReduced = useReducedMotion();

  return (
    <div className="skill-bar-item" ref={ref}>
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{
            duration: prefersReduced ? 0 : 0.8,
            ease: 'easeOut',
            delay: prefersReduced ? 0 : index * 0.05,
          }}
        />
      </div>
    </div>
  );
}

function SkillCategory({ cat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="skill-category glass-card"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="skill-category-header">
        <motion.span
          className="category-icon"
          whileHover={{ rotate: 10 }}
          transition={{ duration: 0.2 }}
        >
          {cat.icon}
        </motion.span>
        <h3>{cat.title}</h3>
      </div>
      <div className="skill-bars">
        {cat.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <FadeUp>
          <header className="section-header">
            <h2>
              Frontend Skills
              <motion.span
                className="section-underline"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </h2>
            <p>Tools and concepts I use to ship reliable, user‑friendly UIs.</p>
          </header>
        </FadeUp>

        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <SkillCategory key={cat.title} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
