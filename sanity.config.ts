import { defineConfig } from 'sanity';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'last-seen-dreaming',
  title: 'Last Seen Dreaming',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'replace-me',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  schema: { types: schemaTypes }
});
