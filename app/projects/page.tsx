import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Motion';
import { projects } from '@/lib/projects';

const cardAssets = [
  '/projects/tapori-card.png',
  '/projects/henry-itondo-card.png',
  '/projects/nuria-pelayo-card.png',
];

const cardLabels = ['Tapori', 'Henry Itondo', 'Henry Itondo'];

export default function ProjectsPage() {
  return <main className="projects-page">
    <section className="projects-list" aria-label="Projects">
      {projects.slice(0, 3).map((project, index) => <Reveal className="project-card-reveal" delay={index * 0.08} key={project.slug}>
        <Link href={`/projects/${project.slug}`} className="projects-page-card">
          <Image src={cardAssets[index]} alt={`${cardLabels[index]} project`} fill sizes="387px" />
          <span>{cardLabels[index]}</span>
        </Link>
      </Reveal>)}
    </section>
    <Footer />
  </main>;
}
