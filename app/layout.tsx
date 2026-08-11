import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteShell } from '@/components/SiteShell';

export const metadata: Metadata = {
  title: 'Last Seen Dreaming',
  description: 'A London production house that turns ideas into visuals.'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}
