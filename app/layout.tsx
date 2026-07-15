import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { SmoothScroll } from '@/components/SmoothScroll';
import { PageTransitionProvider } from '@/components/PageTransitionProvider';

export const metadata: Metadata = {
  title: 'Last Seen Dreaming',
  description: 'A London production house that turns ideas into visuals.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SmoothScroll /><Header /><PageTransitionProvider>{children}</PageTransitionProvider></body></html>;
}
