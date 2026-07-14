'use client';

import type { ReactNode } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

type MotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const easing = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  return <MotionConfig reducedMotion="user">
    <AnimatePresence mode="sync">
      <motion.div
        className="route-transition"
        key={pathname}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.38, ease: easing }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
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
