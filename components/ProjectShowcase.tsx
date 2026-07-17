import Link from 'next/link';
import { BlobFrame } from '@/components/BlobFrame';
import { ProjectMedia } from '@/components/ProjectMedia';
import type { MediaItem, Project } from '@/lib/projects';

const showcaseTitles = ['Tapori', 'Henry Itondo', 'Nuria Pelayo'];
const showcaseAssets = [
  '/projects/tapori-card.png',
  '/projects/henry-itondo-card.png',
  '/projects/nuria-pelayo-card.png',
];

const fallbackCardMedia = (project: Project, index: number): { media: MediaItem; preClipped: boolean } => {
  const src = project.id === project.slug ? showcaseAssets[index] : undefined;
  return src
    ? { media: { type: 'image', src, alt: '' }, preClipped: true }
    : { media: project.cover, preClipped: false };
};

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  return <section className="showcase" aria-labelledby="selected-work">
    <h2 id="selected-work">Select Projects</h2>
    <div className="projects-row">
      {projects.map((project, index) => {
        const { media, preClipped } = fallbackCardMedia(project, index);

        return <Link href={`/projects/${project.slug}`} className="project-card" key={project.slug}>
          <BlobFrame seed={project.slug} preClipped={preClipped}>
            <ProjectMedia media={media} alt="" fill className="project-card-art" sizes="(max-width: 700px) 90vw, 343px" autoPlay />
          </BlobFrame>
          <span>{project.id === project.slug ? (showcaseTitles[index] ?? project.title) : project.title}</span>
        </Link>;
      })}
    </div>
  </section>;
}
