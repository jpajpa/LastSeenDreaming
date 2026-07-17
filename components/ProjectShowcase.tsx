import Link from 'next/link';
import { BlobFrame } from '@/components/BlobFrame';
import { ProjectMedia } from '@/components/ProjectMedia';
import type { Project } from '@/lib/projects';

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  return <section className="showcase" aria-labelledby="selected-work">
    <h2 id="selected-work">Select Projects</h2>
    <div className="projects-row">
      {projects.map((project) => <Link href={`/projects/${project.slug}`} className="project-card" key={project.slug}>
        <BlobFrame seed={project.slug}>
          <ProjectMedia media={project.cover} alt="" fill className="project-card-art" sizes="(max-width: 700px) 90vw, 343px" autoPlay />
        </BlobFrame>
        <span>{project.title}</span>
      </Link>)}
    </div>
  </section>;
}
