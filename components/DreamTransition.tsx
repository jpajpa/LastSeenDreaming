'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useEffectEvent, useRef, useState } from 'react';

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

  const handleClick = useEffectEvent((event: MouseEvent) => {
    const link = (event.target as HTMLElement).closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href === pathname) return;

    event.preventDefault();
    if (phase !== 'idle') return;
    setPhase('out');
    setTimeout(() => {
      window.scrollTo(0, 0);
      router.push(href);
    }, 950);
  });

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <div className={`dream-overlay dream-overlay--${phase}`} />;
}
