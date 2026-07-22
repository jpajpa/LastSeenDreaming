import Image from 'next/image';
import { Atmosphere } from '@/components/Atmosphere';
import { Footer } from '@/components/Footer';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { Reveal } from '@/components/Motion';
import { getProjects } from '@/lib/projects';
import logo from './assets/SVG/logo.svg';
import UberEatsLogo from './assets/PNG/UberEats_logo.png';
import AppleMusicLogo from './assets/PNG/AppleMusic_logo.png';
import RocNationLogo from './assets/PNG/Rocnation_logo.png';
import GqLogo from './assets/PNG/GQ_logo.png';
import PhilipsLogo from './assets/PNG/Philips_logo.png';
import SoccerAidLogo from './assets/PNG/SoccerAid_logo.png';
import NorthFaceLogo from './assets/PNG/NorthFace_logo.png';
import UniversalLogo from './assets/PNG/Universal_logo.png';

const clients = [
  { name: 'Uber Eats', image: UberEatsLogo, size: 'uber-eats' },
  { name: 'Apple Music', image: AppleMusicLogo, size: 'apple-music' },
  { name: 'Roc Nation', image: RocNationLogo, size: 'roc-nation' },
  { name: 'GQ', image: GqLogo, size: 'gq' },
  { name: 'Philips', image: PhilipsLogo, size: 'philips' },
  { name: 'Soccer Aid', image: SoccerAidLogo, size: 'soccer-aid' },
  { name: 'The North Face', image: NorthFaceLogo, size: 'north-face' },
  { name: 'Universal', image: UniversalLogo, size: 'universal' },
];

export default async function HomePage() {
  const projects = await getProjects();
  const featuredProjects = projects.filter((project) => project.featured);

  return <main>
    <section className="hero">
      <Atmosphere />
      <h1><Image src={logo} alt="Last Seen Dreaming" priority /></h1>
    </section>
    <Reveal className="home-intro-reveal"><section className="intro content-width">
      <Atmosphere variant="wander" />
      <p className="muted">Last Seen Dreaming is a London production house that chases dreams and turns them into visuals.<span className="inline-reel"><video autoPlay muted loop playsInline src="/atmosphere/hero-reel.mp4" /></span></p>
      <div className="client-strip" aria-label="Selected clients">
        {clients.map((client) => <span className={`client-logo client-logo--${client.size}`} key={client.name}>
          <Image src={client.image} alt={client.name} sizes="(max-width: 700px) 120px, 150px" />
        </span>)}
      </div>
    </section></Reveal>
    <Reveal className="home-dream-reveal"><section className="dream content-width"><Atmosphere variant="dream" /><p>Some ideas show up <em>like something you saw in your dream</em></p><p className="muted">Vivid and restless, but gone, if you don&apos;t chase them</p></section></Reveal>
    <Reveal className="home-showcase-reveal"><ProjectShowcase projects={(featuredProjects.length > 0 ? featuredProjects : projects).slice(0, 3)} /></Reveal>
    <Reveal><Footer /></Reveal>
  </main>;
}
