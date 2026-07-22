'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ScrollFadeReel() {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80, 200], [0, 0, 1]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <motion.span
      className="inline-reel"
      style={isMobile ? { opacity } : undefined}
    >
      <video autoPlay muted loop playsInline src="/atmosphere/hero-reel.mp4" />
    </motion.span>
  );
}
