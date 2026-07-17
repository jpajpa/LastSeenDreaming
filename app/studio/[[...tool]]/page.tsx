import type { Metadata } from 'next';
import { metadata as studioMetadata, NextStudio, viewport } from 'next-sanity/studio';
import config from '@/sanity.config';

export const dynamic = 'force-static';
export { viewport };

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'Project Portal — Last Seen Dreaming',
};

function PortalSetup() {
  return (
    <main className="portal-setup">
      <section className="portal-setup-card">
        <p className="portal-kicker">Last Seen Dreaming</p>
        <h1>Project portal</h1>
        <p>
          The portal is ready. Connect this deployment to a Sanity project to start adding images,
          videos and project descriptions.
        </p>
        <div className="portal-setup-steps">
          <span>Required environment variables</span>
          <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>
          <code>NEXT_PUBLIC_SANITY_DATASET</code>
        </div>
      </section>
    </main>
  );
}

export default function StudioPage() {
  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET,
  );

  return isConfigured ? <NextStudio config={config} /> : <PortalSetup />;
}
