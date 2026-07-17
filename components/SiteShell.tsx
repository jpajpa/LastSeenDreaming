'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { DreamTransition } from '@/components/DreamTransition';
import { Header } from '@/components/Header';
import { MotionProvider } from '@/components/Motion';
import { SmoothScroll } from '@/components/SmoothScroll';

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith('/studio')) return children;

  return (
    <>
      <SmoothScroll />
      <DreamTransition />
      <Header />
      <MotionProvider>{children}</MotionProvider>
    </>
  );
}
