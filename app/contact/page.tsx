import { Atmosphere } from '@/components/Atmosphere';
import { Reveal } from '@/components/Motion';

export default function ContactPage() {
  return <main className="contact-page"><Atmosphere variant="contact" /><Reveal className="contact-content"><a href="mailto:inbox@lastseendreaming.com">inbox@lastseendreaming.com</a></Reveal></main>;
}
