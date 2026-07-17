import type { Metadata } from 'next';
import './globals.css';
import { SiteShell } from '@/components/SiteShell';

export const metadata: Metadata = {
  title: 'Last Seen Dreaming',
  description: 'A London production house that turns ideas into visuals.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}
