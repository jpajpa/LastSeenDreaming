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

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target += e.deltaY * 0.85;
      target = Math.max(0, Math.min(target, document.body.scrollHeight - window.innerHeight));
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    function update() {
      current = lerp(current, target, 0.12);
      if (Math.abs(current - target) < 0.3) {
        current = target;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(update);
    }
    raf = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
