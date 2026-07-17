import Link from 'next/link';
import { BlobFrame } from '@/components/BlobFrame';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Motion';
import { ProjectMedia } from '@/components/ProjectMedia';
import { getProjects } from '@/lib/projects';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <main className="projects-page">
    <section className="projects-list" aria-label="Projects">
      {projects.map((project, index) => <Reveal className="project-card-reveal" delay={index * 0.08} key={project.id}>
        <Link href={`/projects/${project.slug}`} className="projects-page-card">
          <BlobFrame seed={project.slug}>
            <ProjectMedia media={project.cover} alt="" fill sizes="387px" autoPlay />
          </BlobFrame>
          <span>{project.title}</span>
        </Link>
      </Reveal>)}
    </section>
    <Footer />
  </main>;
}
