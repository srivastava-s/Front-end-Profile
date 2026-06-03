import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import FadeUp from './FadeUp';
import './Contact.css';

const contactLinks = [
  { label: '✉ Email', href: `mailto:${profile.email}`, text: profile.email },
  { label: '💼 LinkedIn', href: profile.linkedin, text: 'Connect on LinkedIn', external: true },
  { label: '🐙 GitHub', href: profile.github, text: 'View GitHub profile', external: true },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <FadeUp>
          <div className="contact-cta-wrapper">
            {/* Decorative glow */}
            <motion.div
              className="contact-glow"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="contact-cta glass-card"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <header className="contact-header">
                <h2>Let's work together</h2>
                <p>
                  Interested in frontend roles, UI engineering, or collaborating on a
                  project? I'd love to hear from you.
                </p>
              </header>

              <motion.div
                className="contact-pills"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {contactLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="contact-pill"
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    variants={pillVariants}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(167, 139, 250, 0.12)',
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="contact-pill-label">{link.label}</span>
                    <span className="contact-pill-text">{link.text}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
