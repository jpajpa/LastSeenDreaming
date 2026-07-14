'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' }
];

export function Header() {
  const pathname = usePathname();
  return <header className="site-header"><nav aria-label="Primary navigation">
    {links.map((link) => <Link className={pathname === link.href || (link.href === '/projects' && pathname.startsWith('/projects/')) ? 'active' : ''} href={link.href} key={link.href}>{link.label}</Link>)}
  </nav></header>;
}
