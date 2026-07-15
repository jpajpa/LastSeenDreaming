import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FadeIn } from '@/components/FadeIn';
import { Footer } from '@/components/Footer';
import { getProject, projects } from '@/lib/projects';

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.indexOf(project);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return <main className="project-page page-shell">
    <FadeIn><header className="project-title"><p className="eyebrow">{project.discipline} · {project.year}</p><h1>{project.title}</h1></header></FadeIn>
    <FadeIn><figure className="hero-media"><Image src={project.cover.src} alt={project.cover.alt} fill priority sizes="100vw" /></figure></FadeIn>
    <FadeIn><div className="project-copy"><p>{project.description}</p></div></FadeIn>
    <div className="gallery">{project.gallery.slice(1).map((item) => <FadeIn key={item.src}><figure><Image src={item.src} alt={item.alt} width={1800} height={1200} sizes="(max-width: 700px) 100vw, 84vw" /></figure></FadeIn>)}</div>
    <nav className="project-nav" aria-label="Project navigation"><Link href={`/projects/${previous.slug}`}>← Prev</Link><Link href={`/projects/${next.slug}`}>Next →</Link></nav><Footer />
  </main>;
}
