import Link from 'next/link';
import { BlobFrame } from '@/components/BlobFrame';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Motion';
import { ProjectMedia } from '@/components/ProjectMedia';
import { getProjects, type MediaItem, type Project } from '@/lib/projects';

const cardAssets = [
  '/projects/tapori-card.png',
  '/projects/henry-itondo-card.png',
  '/projects/nuria-pelayo-card.png',
];

const cardLabels = ['Tapori', 'Henry Itondo', 'Henry Itondo'];

const fallbackCardMedia = (project: Project, index: number): { media: MediaItem; preClipped: boolean } => {
  const src = project.id === project.slug ? cardAssets[index] : undefined;
  return src
    ? { media: { type: 'image', src, alt: '' }, preClipped: true }
    : { media: project.cover, preClipped: false };
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <main className="projects-page">
    <section className="projects-list" aria-label="Projects">
      {projects.map((project, index) => {
        const { media, preClipped } = fallbackCardMedia(project, index);

        return <Reveal className="project-card-reveal" delay={index * 0.08} key={project.id}>
          <Link href={`/projects/${project.slug}`} className="projects-page-card">
            <BlobFrame seed={project.slug} preClipped={preClipped}>
              <ProjectMedia media={media} alt="" fill sizes="387px" autoPlay />
            </BlobFrame>
            <span>{project.id === project.slug ? (cardLabels[index] ?? project.title) : project.title}</span>
          </Link>
        </Reveal>;
      })}
    </section>
    <Footer />
  </main>;
}
