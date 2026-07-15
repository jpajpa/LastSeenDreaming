import Image from ‘next/image’;
import { Atmosphere } from ‘@/components/Atmosphere’;
import { FadeIn } from ‘@/components/FadeIn’;
import { Footer } from ‘@/components/Footer’;
import { ProjectShowcase } from ‘@/components/ProjectShowcase’;
import { projects } from ‘@/lib/projects’;
import logo from ‘./assets/SVG/logo.svg’;

export default function HomePage() {
  return <main>
    <section className="hero">
      <Atmosphere />
      <h1><Image src={logo} alt="Last Seen Dreaming" priority /></h1>
    </section>
    <section className="intro content-width">
      <FadeIn><p className="muted">Last Seen Dreaming is a London production house that chases those ideas and turns them into visuals.</p></FadeIn>
      <FadeIn delay={0.15}><p>From music videos to brand campaigns and from daydream to delivery.</p></FadeIn>
      <FadeIn delay={0.3}><div className="client-strip" aria-label="Selected clients"><span>Cisco</span><span>Adobe</span><span>Apple</span><span>Adobe</span><span>Cisco</span><span>Apple</span></div></FadeIn>
    </section>
    <section className="dream content-width">
      <Atmosphere compact />
      <FadeIn className="dream-line-1"><p>Some ideas show up <em>like something you saw in your dream</em></p></FadeIn>
      <FadeIn className="dream-line-2" delay={0.2}><p className="muted">Vivid and restless, but gone, if you don’t chase them</p></FadeIn>
    </section>
    <FadeIn><ProjectShowcase projects={projects.filter((project) => project.featured)} /></FadeIn>
    <Footer />
  </main>;
}
