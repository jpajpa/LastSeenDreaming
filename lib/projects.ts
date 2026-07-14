import Tapori2 from '@/app/assets/Tapori/Tapori-2.png';
import Tapori3 from '@/app/assets/Tapori/Tapori-3.png';
import Tapori4 from '@/app/assets/Tapori/Tapori-4.png';

export type MediaItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  title: string;
  slug: string;
  year: string;
  discipline: string;
  excerpt: string;
  description: string;
  cover: MediaItem;
  gallery: MediaItem[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    title: 'Tapori', slug: 'tapori', year: '2024', discipline: 'Music film', featured: true,
    excerpt: 'A kinetic portrait of rhythm, heat and a place that refuses to stand still.',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    cover: { src: Tapori2.src, alt: 'Two performers beside a tropical water race' },
    gallery: [
      { src: Tapori2.src, alt: 'Two performers beside a tropical water race' },
      { src: Tapori3.src, alt: 'Two performers gesturing in front of palm trees' },
      { src: Tapori4.src, alt: 'A pair of decorated oxen racing through water' }
    ]
  },
  {
    title: 'Henry Tondo', slug: 'henry-tondo', year: '2024', discipline: 'Brand campaign', featured: true,
    excerpt: 'A vivid campaign where colour, character and sound collide.',
    description: 'For Henry Tondo, we made a bold campaign system that stayed human at every touchpoint: film, stills and a suite of restless digital moments.',
    cover: { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85', alt: 'Colourful lights at a concert' },
    gallery: [
      { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=85', alt: 'Colourful lights at a concert' },
      { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85', alt: 'Starry sky over mountains' },
      { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=85', alt: 'Colourful lights at a concert' }
    ]
  },
  {
    title: 'Solar', slug: 'solar', year: '2023', discipline: 'Identity film', featured: true,
    excerpt: 'A warm, optimistic identity film made for the long view.',
    description: 'Solar asked us to make a feeling, rather than an ad. The result is a bright visual study in texture, optimism and the everyday magic of light.',
    cover: { src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=85', alt: 'Golden sunlight in a field' },
    gallery: [
      { src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85', alt: 'Sunset over a field' },
      { src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=85', alt: 'Bright modern interior' },
      { src: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1800&q=85', alt: 'Stars in the night sky' }
    ]
  }
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
