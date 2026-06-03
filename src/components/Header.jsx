import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data/profile';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Navbar bg opacity driven by scroll
  const navBg = useTransform(
    scrollYProgress,
    [0, 0.02],
    ['rgba(9,9,11,0)', 'rgba(9,9,11,0.85)']
  );
  const borderOpacity = useTransform(
    scrollYProgress,
    [0, 0.02],
    [0, 1]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.header
        className="site-header"
        style={{
          backgroundColor: navBg,
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="header-border"
          style={{ opacity: borderOpacity }}
        />

        <div className="container header-inner">
          <div className="branding">
            <span className="logo-mark">{profile.initials}</span>
            <div>
              <h1 className="site-title">{profile.name}</h1>
              <p className="site-role">{profile.role}</p>
            </div>
          </div>

          <nav className="nav">
            <button
              className={`nav-toggle${menuOpen ? ' active' : ''}`}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Desktop nav */}
            <ul className="nav-links desktop-nav">
              {links.map((l) => (
                <li key={l.href}>
                  <motion.a
                    href={l.href}
                    onClick={(e) => handleLinkClick(e, l.href)}
                    whileHover={{ color: '#a78bfa' }}
                    transition={{ duration: 0.15 }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* Mobile nav */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="mobile-menu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ul className="mobile-nav-links">
                    {links.map((l, i) => (
                      <motion.li
                        key={l.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <a href={l.href} onClick={(e) => handleLinkClick(e, l.href)}>
                          {l.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </motion.header>
    </>
  );
}
