import Image from 'next/image';
import { Atmosphere } from '@/components/Atmosphere';
import { Footer } from '@/components/Footer';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { projects } from '@/lib/projects';
import logo from './assets/SVG/logo.svg';

export default function HomePage() {
  return <main>
    <section className="hero">
      <Atmosphere />
      <h1><Image src={logo} alt="Last Seen Dreaming" priority /></h1>
    </section>
    <section className="intro content-width">
      <p className="muted">Last Seen Dreaming is a London production house that chases those ideas and turns them into visuals.</p>
      <p>From music videos to brand campaigns and from daydream to delivery.</p>
      <div className="client-strip" aria-label="Selected clients"><span>Cisco</span><span>Adobe</span><span>Apple</span><span>Adobe</span><span>Cisco</span><span>Apple</span></div>
    </section>
    <section className="dream content-width"><Atmosphere compact /><p>Some ideas show up <em>like something you saw in your dream</em></p><p className="muted">Vivid and restless, but gone, if you don’t chase them</p></section>
    <ProjectShowcase projects={projects.filter((project) => project.featured)} />
    <Footer />
  </main>;
}
