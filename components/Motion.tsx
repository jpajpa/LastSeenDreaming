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
    initial={false}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.14 }}
    transition={reducedMotion ? { duration: 0 } : { duration: 0.7, delay, ease: easing }}
  >
    {children}
  </motion.div>;
}
