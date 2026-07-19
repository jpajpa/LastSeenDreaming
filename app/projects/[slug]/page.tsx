import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Motion';
import { ProjectMedia } from '@/components/ProjectMedia';
import { getProjects, type MediaItem } from '@/lib/projects';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(({ slug }) => ({ slug }));
}

function isPortrait(item: MediaItem) {
  return item.width && item.height && item.height > item.width;
}

function buildGalleryRows(items: MediaItem[]) {
  const rows: { type: 'single' | 'pair'; items: MediaItem[]; startIndex: number }[] = [];
  let i = 0;
  while (i < items.length) {
    if (isPortrait(items[i]) && i + 1 < items.length && isPortrait(items[i + 1])) {
      rows.push({ type: 'pair', items: [items[i], items[i + 1]], startIndex: i });
      i += 2;
    } else {
      rows.push({ type: 'single', items: [items[i]], startIndex: i });
      i += 1;
    }
  }
  return rows;
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
  const galleryItems = project.gallery.slice(1);
  const galleryRows = buildGalleryRows(galleryItems);

  return (
    <main className="project-page page-shell">
      <header className="project-title">
        {details ? <p className="eyebrow">{details}</p> : null}
        <h1>{project.title}</h1>
      </header>

      <Reveal className="project-hero-reveal">
        <figure className="hero-media">
          <ProjectMedia
            media={project.cover}
            fill
            priority
            sizes="100vw"
            controls
            autoPlay={project.cover.type === 'video'}
          />
        </figure>
      </Reveal>

      <Reveal className="project-copy-reveal">
        <div className="project-copy">
          <p>{project.description}</p>
        </div>
      </Reveal>

      <div className="gallery">
        {galleryRows.map((row) => (
          <Reveal
            className="project-gallery-item-reveal"
            delay={Math.min(row.startIndex * 0.06, 0.18)}
            key={`row-${row.startIndex}`}
          >
            {row.type === 'pair' ? (
              <div className="gallery-pair">
                {row.items.map((item, i) => (
                  <figure key={`${item.src}-${row.startIndex + i}`}>
                    <ProjectMedia media={item} sizes="(max-width: 700px) 50vw, 42vw" controls />
                  </figure>
                ))}
              </div>
            ) : (
              <figure>
                <ProjectMedia media={row.items[0]} sizes="(max-width: 700px) 100vw, 84vw" controls />
              </figure>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal className="project-nav-reveal">
        <nav className="project-nav" aria-label="Project navigation">
          <Link href={`/projects/${previous.slug}`}>← Prev</Link>
          <Link href={`/projects/${next.slug}`}>Next →</Link>
        </nav>
      </Reveal>
      <Footer />
    </main>
  );
}
