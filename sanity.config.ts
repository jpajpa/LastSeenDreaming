'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { PortalIcon } from './sanity/PortalIcon';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/studioStructure';

const singletonTypes = new Set(['homePage', 'siteSettings']);

export default defineConfig({
  name: 'last-seen-dreaming',
  title: 'Last Seen Dreaming — CMS',
  icon: PortalIcon,
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'replace-me',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (previous) =>
      previous.filter(({ templateId }) => !singletonTypes.has(templateId)),
    actions: (previous, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? previous.filter(({ action }) => action !== 'delete' && action !== 'duplicate')
        : previous,
  },
});
