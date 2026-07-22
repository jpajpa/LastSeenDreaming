'use client';

import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';

export function ScrollFadeSection({ children, className }: { children: ReactNode; className?: string }) {
  const [isMobile, setIsMobile] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (!isMobile) return;
    if (y < 60) {
      setOpacity(0);
    } else if (y < 260) {
      setOpacity((y - 60) / 200);
    } else {
      setOpacity(1);
    }
  });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)');
    const update = (matches: boolean) => {
      setIsMobile(matches);
      if (!matches) setOpacity(1);
      else setOpacity(window.scrollY < 60 ? 0 : Math.min(1, (window.scrollY - 60) / 200));
    };
    update(mq.matches);
    const handler = (e: MediaQueryListEvent) => update(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className={className} style={isMobile ? { opacity, transition: 'opacity 0.15s ease-out' } : undefined}>
      {children}
    </div>
  );
}
