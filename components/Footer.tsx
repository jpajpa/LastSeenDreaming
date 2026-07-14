import Image from 'next/image';
import Link from 'next/link';
import logo from '@/app/assets/SVG/logo.svg';

export function Footer() {
  return <footer className="site-footer">
    <Link href="/" className="footer-mark" aria-label="Last Seen Dreaming home"><Image src={logo} alt="" /></Link>
    <p>Last Seen Dreaming Inc.<br />2310 Ethels Lane Office<br />Tampa, FL</p>
    <div><Link href="/legal">Legal</Link><Link href="/privacy">Privacy policy</Link></div>
  </footer>;
}
