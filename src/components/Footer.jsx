import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import './Footer.css';

export default function Footer() {
  const socials = [
    { href: profile.github, label: 'GitHub' },
    { href: profile.linkedin, label: 'LinkedIn' },
    { href: profile.leetcode, label: 'LeetCode' },
  ];

  return (
    <footer className="site-footer">
      {/* Animated divider line */}
      <motion.div
        className="footer-divider"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: 'left' }}
      />

      <div className="container footer-inner">
        <motion.p
          className="footer-copy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          © {new Date().getFullYear()} Shashank Kumar Srivastava
        </motion.p>



        <motion.a
          href="#top"
          className="back-to-top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          whileHover={{ color: '#c4b5fd' }}
        >
          Back to top{' '}
          <motion.span
            style={{ display: 'inline-block' }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↑
          </motion.span>
        </motion.a>
      </div>
    </footer>
  );
}
