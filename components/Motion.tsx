'use client';

import type { ReactNode } from 'react';
import { motion, MotionConfig, useReducedMotion } from 'framer-motion';

type MotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const easing = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">
    {children}
  </MotionConfig>;
}

export function Reveal({ children, className, delay = 0 }: MotionProps) {
  const reducedMotion = useReducedMotion();

  return <motion.div
    className={className}
    initial={{ opacity: 0, y: 64 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={reducedMotion ? { duration: 0 } : { duration: 1.6, delay, ease: easing }}
  >
    {children}
  </motion.div>;
}
