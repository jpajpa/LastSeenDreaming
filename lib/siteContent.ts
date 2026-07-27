import { cache } from 'react';
import { getSanityClient } from '@/lib/sanity';

const defaultContactEmail = 'inbox@lastseendreaming.com';

export type HomePageContent = {
  intro: string;
  clientLogos: ClientLogo[] | null;
  featuredProjectIds: string[];
  mainVideoUrl: string;
  mainVideoMimeType: string;
  mainVideoLabel: string;
};

export type ClientLogo = {
  id: string;
  name: string;
  imageUrl: string;
  width: number;
  height: number;
  displayScale: number;
};

type CmsHomePage = {
  intro?: string;
  clientLogos?: Array<{
    id?: string;
    name?: string;
    imageUrl?: string;
    width?: number;
    height?: number;
    displayScale?: number;
  }> | null;
  featuredProjectIds?: string[];
  mainVideoUrl?: string;
  mainVideoMimeType?: string;
  mainVideoLabel?: string;
};

type CmsSiteSettings = {
  contactEmail?: string;
};

const fallbackHomePage: HomePageContent = {
  intro: 'Last Seen Dreaming is a London production house that chases dreams and turns them into visuals.',
  clientLogos: null,
  featuredProjectIds: [],
  mainVideoUrl: '/videos/2025-highlight-reel.web.mp4',
  mainVideoMimeType: 'video/mp4',
  mainVideoLabel: '2025 highlight reel',
};

const homePageQuery = `*[_type == "homePage" && _id == "homePage"][0] {
  intro,
  "clientLogos": clientLogos[] {
    "id": _key,
    name,
    "imageUrl": logo.asset->url,
    "width": logo.asset->metadata.dimensions.width,
    "height": logo.asset->metadata.dimensions.height,
    displayScale
  },
  "featuredProjectIds": featuredProjects[]._ref,
  "mainVideoUrl": mainVideo.asset->url,
  "mainVideoMimeType": mainVideo.asset->mimeType,
  mainVideoLabel
}`;

const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
  contactEmail
}`;

export const getHomePageContent = cache(async (): Promise<HomePageContent> => {
  const client = getSanityClient();
  if (!client) return fallbackHomePage;

  try {
    const content = await client.fetch<CmsHomePage | null>(homePageQuery, {}, {
      next: { revalidate: 60, tags: ['homePage'] },
    });

    if (!content) return fallbackHomePage;

    const clientLogos = content.clientLogos === null || content.clientLogos === undefined
      ? null
      : content.clientLogos.flatMap((logo) => {
        if (!logo.id || !logo.name || !logo.imageUrl || !logo.width || !logo.height) return [];

        return [{
          id: logo.id,
          name: logo.name,
          imageUrl: logo.imageUrl,
          width: logo.width,
          height: logo.height,
          displayScale: logo.displayScale ?? 1,
        }];
      });

    return {
      intro: content.intro || fallbackHomePage.intro,
      clientLogos,
      featuredProjectIds: content.featuredProjectIds || [],
      mainVideoUrl: content.mainVideoUrl || fallbackHomePage.mainVideoUrl,
      mainVideoMimeType: content.mainVideoMimeType || fallbackHomePage.mainVideoMimeType,
      mainVideoLabel: content.mainVideoLabel || fallbackHomePage.mainVideoLabel,
    };
  } catch (error) {
    console.error('Unable to load the home page from Sanity. Using local content.', error);
    return fallbackHomePage;
  }
});

export const getContactEmail = cache(async (): Promise<string> => {
  const client = getSanityClient();
  if (!client) return defaultContactEmail;

  try {
    const settings = await client.fetch<CmsSiteSettings | null>(siteSettingsQuery, {}, {
      next: { revalidate: 60, tags: ['siteSettings'] },
    });

    return settings?.contactEmail || defaultContactEmail;
  } catch (error) {
    console.error('Unable to load site settings from Sanity. Using the local contact email.', error);
    return defaultContactEmail;
  }
});
