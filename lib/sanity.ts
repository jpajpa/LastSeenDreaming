import { createClient } from 'next-sanity';

let client: ReturnType<typeof createClient> | null = null;

export function hasSanityConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET);
}

export function getSanityClient() {
  if (!hasSanityConfig()) return null;

  if (!client) {
    client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: '2026-07-01',
      useCdn: true,
    });
  }

  return client;
}
