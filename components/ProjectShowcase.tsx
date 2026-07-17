import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/projects';
import { GeneratedProjectCard } from './GeneratedProjectCard';

const showcaseTitles = ['Tapori', 'Henry Itondo', 'Nuria Pelayo'];
const showcaseAssets = [
  '/projects/tapori-card.png',
  '/projects/henry-itondo-card.png',
  '/projects/nuria-pelayo-card.png',
];

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  return <section className="showcase" aria-labelledby="selected-work">
    <h2 id="selected-work">Select Projects</h2>
    <div className="projects-row">
      {projects.map((project, index) => {
        const isGenerated = index >= showcaseAssets.length;
        return <Link href={`/projects/${project.slug}`} className="project-card" key={project.slug}>
          {isGenerated
            ? <GeneratedProjectCard src={project.cover.src} alt={project.cover.alt} seed={index * 17 + 5} />
            : <Image src={showcaseAssets[index]} alt="" fill className="project-card-art" sizes="(max-width: 700px) 90vw, 343px" />
          }
          <span>{showcaseTitles[index] ?? project.title}</span>
        </Link>;
      })}
    </div>
  </section>;
}
