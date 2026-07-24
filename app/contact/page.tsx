import { Atmosphere } from '@/components/Atmosphere';
import { Reveal } from '@/components/Motion';
import { getContactEmail } from '@/lib/siteContent';

export default async function ContactPage() {
  const contactEmail = await getContactEmail();

  return <main className="contact-page"><Atmosphere variant="contact" /><Reveal className="contact-content"><a href={`mailto:${contactEmail}`}>{contactEmail}</a></Reveal></main>;
}
