import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.5,
  y = 24,
  className = '',
  as = 'div',
  stagger = 0,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  const Component = motion[as] || motion.div;

  const variants = {
    hidden: {
      opacity: 0,
      y: prefersReduced ? 0 : y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        ...(stagger > 0 && { staggerChildren: stagger }),
      },
    },
  };

  return (
    <Component
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      {...props}
    >
      {children}
    </Component>
  );
}

// Child variant for use inside FadeUp with stagger
export const fadeUpChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};
