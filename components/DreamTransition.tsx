'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function DreamTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPhase('in');
    const timer = setTimeout(() => setPhase('idle'), 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href === pathname) return;

      e.preventDefault();
      if (phase !== 'idle') return;
      setPhase('out');
      setTimeout(() => {
        window.scrollTo(0, 0);
        router.push(href);
      }, 950);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname, router]);

  return <div className={`dream-overlay dream-overlay--${phase}`} />;
}
