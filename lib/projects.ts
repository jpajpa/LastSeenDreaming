import { cache } from 'react';
import Tapori2 from '@/app/assets/Tapori/Tapori-2.png';
import Tapori3 from '@/app/assets/Tapori/Tapori-3.png';
import Tapori4 from '@/app/assets/Tapori/Tapori-4.png';
import { getSanityClient } from '@/lib/sanity';

export type MediaItem = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  year?: string;
  discipline?: string;
  excerpt: string;
  description: string;
  cover: MediaItem;
  gallery: MediaItem[];
  featured: boolean;
};

type CmsMedia = {
  type?: 'image' | 'video';
  src?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
};

type CmsProject = {
  _id: string;
  title?: string;
  slug?: string;
  year?: string;
  discipline?: string;
  description?: string;
  featured?: boolean;
  mainMedia?: CmsMedia;
  additionalMedia?: CmsMedia[];
};

const projectQuery = `*[_type == "project" && defined(slug.current)] | order(_updatedAt desc) {
  _id,
  title,
  "slug": slug.current,
  year,
  "discipline": projectType,
  description,
  featured,
  "mainMedia": {
    "type": mainMedia.mediaType,
    "src": select(
      mainMedia.mediaType == "video" => mainMedia.video.asset->url,
      mainMedia.image.asset->url
    ),
    "alt": mainMedia.alt,
    "caption": mainMedia.caption,
    "width": mainMedia.image.asset->metadata.dimensions.width,
    "height": mainMedia.image.asset->metadata.dimensions.height
  },
  "additionalMedia": additionalMedia[] {
    "type": mediaType,
    "src": select(
      mediaType == "video" => video.asset->url,
      image.asset->url
    ),
    alt,
    caption,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height
  }
}`;

const image = (src: string, alt: string): MediaItem => ({ type: 'image', src, alt });

export const fallbackProjects: Project[] = [
  {
    id: 'tapori',
    title: 'Tapori', slug: 'tapori', year: '2024', discipline: 'Music film', featured: true,
    excerpt: 'A kinetic portrait of rhythm, heat and a place that refuses to stand still.',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    cover: image(Tapori2.src, 'Two performers beside a tropical water race'),
    gallery: [
      image(Tapori2.src, 'Two performers beside a tropical water race'),
      image(Tapori3.src, 'Two performers gesturing in front of palm trees'),
      image(Tapori4.src, 'A pair of decorated oxen racing through water'),
    ],
  },
  {
    id: 'henry-tondo',
    title: 'Henry Tondo', slug: 'henry-tondo', year: '2024', discipline: 'Brand campaign', featured: true,
    excerpt: 'A vivid campaign where colour, character and sound collide.',
    description: 'For Henry Tondo, we made a bold campaign system that stayed human at every touchpoint: film, stills and a suite of restless digital moments.',
    cover: image('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85', 'Colourful lights at a concert'),
    gallery: [
      image('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=85', 'Colourful lights at a concert'),
      image('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85', 'Starry sky over mountains'),
      image('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=85', 'Colourful lights at a concert'),
    ],
  },
  {
    id: 'solar',
    title: 'Solar', slug: 'solar', year: '2023', discipline: 'Identity film', featured: true,
    excerpt: 'A warm, optimistic identity film made for the long view.',
    description: 'Solar asked us to make a feeling, rather than an ad. The result is a bright visual study in texture, optimism and the everyday magic of light.',
    cover: image('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=85', 'Golden sunlight in a field'),
    gallery: [
      image('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85', 'Sunset over a field'),
      image('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=85', 'Bright modern interior'),
      image('https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1800&q=85', 'Stars in the night sky'),
    ],
  },
];

function normalizeMedia(media: CmsMedia | undefined, fallbackAlt: string): MediaItem | null {
  if (!media?.src) return null;

  return {
    type: media.type === 'video' ? 'video' : 'image',
    src: media.src,
    alt: media.alt || fallbackAlt,
    caption: media.caption,
    width: media.width,
    height: media.height,
  };
}

function normalizeProject(project: CmsProject): Project | null {
  if (!project.title || !project.slug || !project.description) return null;

  const title = project.title;
  const cover = normalizeMedia(project.mainMedia, title);
  if (!cover) return null;

  const additionalMedia = (project.additionalMedia || []).flatMap((media) => {
    const item = normalizeMedia(media, title);
    return item ? [item] : [];
  });

  return {
    id: project._id,
    title,
    slug: project.slug,
    year: project.year,
    discipline: project.discipline,
    excerpt: project.description.length > 155
      ? `${project.description.slice(0, 152).trimEnd()}…`
      : project.description,
    description: project.description,
    cover,
    gallery: [cover, ...additionalMedia],
    featured: Boolean(project.featured),
  };
}

export const getProjects = cache(async (): Promise<Project[]> => {
  const client = getSanityClient();
  if (!client) return fallbackProjects;

  try {
    const documents = await client.fetch<CmsProject[]>(projectQuery, {}, {
      next: { revalidate: 60, tags: ['projects'] },
    });
    const cmsProjects = documents.flatMap((document) => {
      const project = normalizeProject(document);
      return project ? [project] : [];
    });

    return cmsProjects.length > 0 ? cmsProjects : fallbackProjects;
  } catch (error) {
    console.error('Unable to load projects from Sanity. Using local project content.', error);
    return fallbackProjects;
  }
});

export const getProject = cache(async (slug: string) => {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
});
