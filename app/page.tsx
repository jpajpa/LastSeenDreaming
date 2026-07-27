import Image, { type StaticImageData } from 'next/image';
import type { CSSProperties } from 'react';
import { Atmosphere } from '@/components/Atmosphere';
import { Footer } from '@/components/Footer';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { Reveal } from '@/components/Motion';
import { ScrollFadeSection } from '@/components/ScrollFadeReel';
import { getProjects } from '@/lib/projects';
import { getHomePageContent } from '@/lib/siteContent';
import logo from './assets/SVG/logo.svg';
import UberEatsLogo from './assets/PNG/UberEats_logo.png';
import AppleMusicLogo from './assets/PNG/AppleMusic_logo.png';
import RocNationLogo from './assets/PNG/Rocnation_logo.png';
import GqLogo from './assets/PNG/GQ_logo.png';
import PhilipsLogo from './assets/PNG/Philips_logo.png';
import SoccerAidLogo from './assets/PNG/SoccerAid_logo.png';
import NorthFaceLogo from './assets/PNG/NorthFace_logo.png';
import UniversalLogo from './assets/PNG/Universal_logo.png';

type DisplayClientLogo = {
  id: string;
  name: string;
  image: string | StaticImageData;
  width?: number;
  height?: number;
  displayScale: number;
};

const fallbackClients: DisplayClientLogo[] = [
  { id: 'uber-eats', name: 'Uber Eats', image: UberEatsLogo, displayScale: 0.82 },
  { id: 'apple-music', name: 'Apple Music', image: AppleMusicLogo, displayScale: 0.85 },
  { id: 'roc-nation', name: 'Roc Nation', image: RocNationLogo, displayScale: 0.9 },
  { id: 'gq', name: 'GQ', image: GqLogo, displayScale: 1.15 },
  { id: 'philips', name: 'Philips', image: PhilipsLogo, displayScale: 0.82 },
  { id: 'soccer-aid', name: 'Soccer Aid', image: SoccerAidLogo, displayScale: 1.85 },
  { id: 'north-face', name: 'The North Face', image: NorthFaceLogo, displayScale: 1.1 },
  { id: 'universal', name: 'Universal', image: UniversalLogo, displayScale: 1.1 },
];

export default async function HomePage() {
  const [projects, homePage] = await Promise.all([
    getProjects(),
    getHomePageContent(),
  ]);
  const featuredSlugs = ['soccer-aid', 'apple-music-playlist', 'jungle'];
  const defaultFeaturedProjects = featuredSlugs.flatMap((slug) => {
    const project = projects.find((item) => item.slug === slug);
    return project ? [project] : [];
  });
  const selectedProjects = homePage.featuredProjectIds.flatMap((id) => {
    const project = projects.find((item) => item.id === id);
    return project ? [project] : [];
  });
  const featuredProjects = selectedProjects.length > 0
    ? selectedProjects
    : defaultFeaturedProjects.length > 0
      ? defaultFeaturedProjects
      : projects;
  const clients: DisplayClientLogo[] = homePage.clientLogos !== null
    ? homePage.clientLogos.map((client) => ({
      id: client.id,
      name: client.name,
      image: client.imageUrl,
      width: client.width,
      height: client.height,
      displayScale: client.displayScale,
    }))
    : fallbackClients;

  return <main>
    <section className="hero">
      <Atmosphere />
      <h1><Image src={logo} alt="Last Seen Dreaming" priority /></h1>
    </section>
    <ScrollFadeSection className="home-video-reveal">
      <section className="home-video" aria-label={homePage.mainVideoLabel}>
        <video autoPlay loop muted playsInline preload="metadata">
          <source src={homePage.mainVideoUrl} type={homePage.mainVideoMimeType} />
        </video>
        <p className="home-video-text">{homePage.intro}</p>
      </section>
    </ScrollFadeSection>
    <Reveal className="home-intro-reveal"><section className="intro content-width">
      <Atmosphere variant="wander" />
      {clients.length > 0 && <div className="client-strip" aria-label="Selected clients">
        {clients.map((client) => <span
          className="client-logo"
          key={client.id}
          style={{ '--client-logo-scale': client.displayScale } as CSSProperties}
        >
          <Image
            src={client.image}
            alt={client.name}
            width={client.width}
            height={client.height}
            sizes="(max-width: 700px) 100px, 145px"
          />
        </span>)}
      </div>}
    </section></Reveal>
    <Reveal className="home-dream-reveal"><section className="dream content-width"><Atmosphere variant="dream" /><p>Some ideas show up <em>like something you saw in your dream</em></p><p className="muted">Vivid and restless, but gone, if you don&apos;t chase them</p></section></Reveal>
    <Reveal className="home-showcase-reveal">
      <ProjectShowcase projects={featuredProjects.slice(0, 3)} />
    </Reveal>
    <Reveal><Footer /></Reveal>
  </main>;
}
