'use client';

import dynamic from 'next/dynamic';

const AtmosphereCanvas = dynamic(
  () => import('./AtmosphereCanvas').then((module) => module.AtmosphereCanvas),
  { ssr: false }
);

type AtmosphereProps = {
  compact?: boolean;
};

export function Atmosphere({ compact = false }: AtmosphereProps) {
  return (
    <div className={`atmosphere ${compact ? 'compact' : ''}`} aria-hidden="true">
      <AtmosphereCanvas compact={compact} />
      <div className="atmosphere-fallback" />
    </div>
  );
}
