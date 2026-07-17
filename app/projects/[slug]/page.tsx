import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Motion';
import { ProjectMedia } from '@/components/ProjectMedia';
import { getProjects } from '@/lib/projects';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const index = projects.indexOf(project);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const details = [project.discipline, project.year].filter(Boolean).join(' · ');
  return <main className="project-page page-shell"><header className="project-title">{details ? <p className="eyebrow">{details}</p> : null}<h1>{project.title}</h1></header>
    <Reveal className="project-hero-reveal"><figure className="hero-media"><ProjectMedia media={project.cover} fill priority sizes="100vw" controls autoPlay={project.cover.type === 'video'} /></figure></Reveal>
    <Reveal className="project-copy-reveal"><div className="project-copy"><p>{project.description}</p></div></Reveal>
    <Reveal className="project-gallery-reveal"><div className="gallery">{project.gallery.slice(1).map((item, index) => <figure key={`${item.src}-${index}`}><ProjectMedia media={item} sizes="(max-width: 700px) 100vw, 84vw" controls /></figure>)}</div></Reveal>
    <Reveal className="project-nav-reveal"><nav className="project-nav" aria-label="Project navigation"><Link href={`/projects/${previous.slug}`}>← Prev</Link><Link href={`/projects/${next.slug}`}>Next →</Link></nav></Reveal><Footer />
  </main>;
}
