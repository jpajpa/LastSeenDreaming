'use client';

import { useEffect } from 'react';

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth <= 700) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let current = window.scrollY;
    let target = window.scrollY;
    let raf: number;
    let ticking = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!ticking) {
        const actual = window.scrollY;
        if (Math.abs(actual - current) > 2) {
          current = actual;
          target = actual;
        }
      }
      target += e.deltaY;
      const max = document.body.scrollHeight - window.innerHeight;
      target = Math.max(0, Math.min(target, max));
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    function update() {
      current = lerp(current, target, 0.12);
      if (Math.abs(current - target) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        ticking = false;
        return;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(update);
    }

    return () => {
      window.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
