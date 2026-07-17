'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { PortalIcon } from './sanity/PortalIcon';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/studioStructure';

export default defineConfig({
  name: 'last-seen-dreaming',
  title: 'Last Seen Dreaming — Project Portal',
  icon: PortalIcon,
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'replace-me',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
