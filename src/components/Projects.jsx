import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useInView } from 'framer-motion';
import { projects } from '../data/projects';
import FadeUp from './FadeUp';
import './Projects.css';

function TiltCard({ proj, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  // Mouse position for shimmer gradient
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
    mouseX.set(px * 100);
    mouseY.set(py * 100);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    mouseX.set(50);
    mouseY.set(50);
  };

  return (
    <motion.article
      ref={ref}
      className="project-card glass-card"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shimmer overlay */}
      <motion.div
        className="card-shimmer"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([mx, my]) =>
              `radial-gradient(circle at ${mx}% ${my}%, rgba(167,139,250,0.08) 0%, transparent 60%)`
          ),
        }}
      />

      <div className="project-header">
        <h3>{proj.title}</h3>
        <motion.a
          href={proj.link}
          target="_blank"
          rel="noreferrer"
          className="project-link"
          whileHover={{ x: 0 }}
        >
          View code <motion.span className="arrow" whileHover={{ x: 4 }} style={{ display: 'inline-block' }}>↗</motion.span>
        </motion.a>
      </div>
      <p>{proj.description}</p>
      <ul className="project-meta">
        {proj.stack.map((s) => (
          <motion.li
            key={s}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.15 }}
          >
            {s}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <FadeUp>
          <header className="section-header">
            <h2>
              Projects
              <motion.span
                className="section-underline"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </h2>
            <p>Code you can read and UIs you can click through.</p>
          </header>
        </FadeUp>

        <div className="project-grid" style={{ perspective: 1000 }}>
          {projects.map((proj, i) => (
            <TiltCard key={proj.title} proj={proj} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
