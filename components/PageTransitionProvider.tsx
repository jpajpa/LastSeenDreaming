'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [isExiting, setIsExiting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsExiting(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href === pathname) return;

      e.preventDefault();
      setIsExiting(true);
      setTimeout(() => {
        router.push(href);
      }, 500);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname, router]);

  return (
    <div className={`page-transition ${isExiting ? 'exiting' : ''}`}>
      {children}
    </div>
  );
}
