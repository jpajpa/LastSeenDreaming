import { Atmosphere } from '@/components/Atmosphere';
import { FadeIn } from '@/components/FadeIn';

export default function ContactPage() {
  return <main className="contact-page"><Atmosphere compact /><div className="contact-content"><FadeIn><a href="mailto:inbox@lastseendreaming.com">inbox@lastseendreaming.com</a></FadeIn></div></main>;
}
