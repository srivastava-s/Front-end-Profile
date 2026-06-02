import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { profile } from '../data/profile';
import { highlights } from '../data/skills';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './Hero.css';

const roles = ['Frontend Engineer', 'React Developer', 'UI Craftsman'];

function TypewriterRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="typewriter-container">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          className="typewriter-role"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function WordStagger({ text, delay = 0 }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="stagger-word"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.06,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </>
  );
}

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 24 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: prefersReduced ? 0 : 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  });

  return (
    <section className="hero" id="top" ref={sectionRef}>
      {/* Floating background glow */}
      <motion.div
        className="hero-glow"
        animate={
          prefersReduced
            ? {}
            : {
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.25, 0.15],
              }
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-glow hero-glow-secondary"
        animate={
          prefersReduced
            ? {}
            : {
                scale: [1.1, 1, 1.1],
                opacity: [0.1, 0.2, 0.1],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container hero-inner">
        <div className="hero-copy">
          <motion.div className="hero-eyebrow-line" {...fadeUp(0.1)}>
            <TypewriterRole />
            <span className="eyebrow-divider">·</span>
            <span className="eyebrow-text">React · JavaScript</span>
          </motion.div>

          <h2 className="hero-heading">
            {prefersReduced ? (
              'I build fast, user‑centric web interfaces that turn complex ideas into simple, usable products.'
            ) : (
              <WordStagger
                text="I build fast, user‑centric web interfaces that turn complex ideas into simple, usable products."
                delay={0.3}
              />
            )}
          </h2>

          <motion.p className="hero-subtitle" {...fadeUp(0.8)}>
            Focused on React, performance, and clean UI engineering —
            from dashboards and Chrome extensions to AI‑powered productivity tools.
          </motion.p>

          <motion.div className="hero-actions" {...fadeUp(0.95)}>
            <motion.a
              href="#projects"
              className="btn primary"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Frontend Work
            </motion.a>
            <motion.a
              href="#contact"
              className="btn ghost"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get in Touch
            </motion.a>
          </motion.div>

          <motion.div className="hero-meta" {...fadeUp(1.1)}>
            <span className="status-badge">
              <motion.span
                className="pulse-dot"
                animate={
                  prefersReduced
                    ? {}
                    : {
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.5, 1],
                      }
                }
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {profile.location}
            </span>
            <span className="status-badge">{profile.status}</span>
          </motion.div>

          {/* About section */}
          <motion.div
            className="hero-about glass-card"
            id="about"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3>About</h3>
            <p>
              Frontend‑focused engineer with a strong foundation in data structures, algorithms,
              and software design — applying that rigor to build reliable, performant UIs.
            </p>
            <p>
              I specialize in React and modern JavaScript, building responsive interfaces that
              integrate cleanly with APIs and data‑heavy backends. My work spans Chrome extensions,
              analytics dashboards, and AI‑powered web apps.
            </p>
            <motion.aside
              className="pill-list"
              aria-label="Highlights"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {highlights.map((h) => (
                <motion.span
                  key={h}
                  className="pill highlight-pill"
                  variants={{
                    hidden: { opacity: 0, scale: 0.85 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{
                    scale: 1.08,
                    backgroundColor: 'rgba(167, 139, 250, 0.15)',
                    borderColor: '#a78bfa',
                  }}
                  transition={{ duration: 0.15 }}
                >
                  {h}
                </motion.span>
              ))}
            </motion.aside>
          </motion.div>
        </div>

        {/* Profile Card */}
        <motion.aside
          className="hero-card glass-card"
          aria-label="Quick profile"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="profile-frame"
            whileHover={{ scale: 1.03, rotate: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <img
              src={profile.photo}
              alt={`${profile.name} portrait`}
              className="profile-photo"
              width="300"
              height="300"
            />
          </motion.div>
          <div className="profile-details">
            <h3>At a glance</h3>
            <motion.ul
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
              }}
            >
              {profile.glance.map((g) => (
                <motion.li
                  key={g.label}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <strong>{g.label}</strong> {g.value}
                </motion.li>
              ))}
            </motion.ul>
            <div className="hero-links">
              {[
                { href: profile.github, label: 'GitHub' },
                { href: profile.linkedin, label: 'LinkedIn' },
                { href: profile.leetcode, label: 'LeetCode' },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(167, 139, 250, 0.12)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
