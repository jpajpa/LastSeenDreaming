'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function ScrollFadeReel() {
  const [isMobile, setIsMobile] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', () => {
    if (!isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const viewH = window.innerHeight;
    const distFromBottom = viewH - rect.top;
    if (distFromBottom < 0) {
      setOpacity(0);
    } else if (distFromBottom < 200) {
      setOpacity(distFromBottom / 200);
    } else if (rect.top > viewH * 0.55) {
      const fade = (rect.top - viewH * 0.55) / (viewH * 0.2);
      setOpacity(Math.max(0, Math.min(1, 1 - fade)));
    } else {
      setOpacity(1);
    }
  });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <motion.span
      ref={ref}
      className="inline-reel"
      style={isMobile ? { opacity } : undefined}
    >
      <video autoPlay muted loop playsInline src="/atmosphere/hero-reel.mp4" />
    </motion.span>
  );
}
