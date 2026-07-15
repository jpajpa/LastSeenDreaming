import type { Metadata } from 'next';
import './globals.css';
import { DreamTransition } from '@/components/DreamTransition';
import { Header } from '@/components/Header';
import { MotionProvider } from '@/components/Motion';
import { SmoothScroll } from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Last Seen Dreaming',
  description: 'A London production house that turns ideas into visuals.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SmoothScroll /><DreamTransition /><Header /><MotionProvider>{children}</MotionProvider></body></html>;
}
