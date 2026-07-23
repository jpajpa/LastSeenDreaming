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
          <ProjectMedia media={project.cover} alt="" fill className="project-card-art" sizes="(max-width: 700px) 45vw, 343px" autoPlay />
        </BlobFrame>
        <span>{project.title}</span>
      </Link>)}
      <Link href="/projects" className="project-card view-all-card">
        <BlobFrame seed="view-all">
          <div className="view-all-gradient" />
        </BlobFrame>
        <span className="view-all-label">View all</span>
      </Link>
    </div>
  </section>;
}
