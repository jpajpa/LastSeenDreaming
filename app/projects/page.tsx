import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { projects } from '@/lib/projects';

export default function ProjectsPage() {
  return <main className="archive page-shell"><header className="page-intro"><p className="eyebrow">Selected work</p><h1>Projects that stay<br />with you.</h1></header>
    <div className="archive-grid">{projects.map((project) => <Link href={`/projects/${project.slug}`} className="archive-card" key={project.slug}>
      <div className="media"><Image src={project.cover.src} alt={project.cover.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /></div>
      <div><h2>{project.title}</h2><p>{project.discipline} · {project.year}</p></div>
    </Link>)}</div><Footer />
  </main>;
}
