'use client';

import Image from 'next/image';

type GeneratedProjectCardProps = {
  src: string;
  alt: string;
  seed?: number;
};

function blobPath(seed: number): string {
  const points = 8;
  const coords: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const variance = 0.12;
    const pseudoRandom = Math.sin(seed * 127.1 + i * 311.7) * 0.5 + 0.5;
    const r = 0.38 + variance * (pseudoRandom - 0.5);
    coords.push([0.5 + r * Math.cos(angle), 0.5 + r * Math.sin(angle)]);
  }

  const parts: string[] = [`M ${coords[0][0].toFixed(4)} ${coords[0][1].toFixed(4)}`];
  for (let i = 0; i < coords.length; i++) {
    const curr = coords[i];
    const next = coords[(i + 1) % coords.length];
    const prev = coords[(i - 1 + coords.length) % coords.length];
    const nextNext = coords[(i + 2) % coords.length];
    const cp1x = curr[0] + (next[0] - prev[0]) * 0.25;
    const cp1y = curr[1] + (next[1] - prev[1]) * 0.25;
    const cp2x = next[0] - (nextNext[0] - curr[0]) * 0.25;
    const cp2y = next[1] - (nextNext[1] - curr[1]) * 0.25;
    parts.push(`C ${cp1x.toFixed(4)} ${cp1y.toFixed(4)}, ${cp2x.toFixed(4)} ${cp2y.toFixed(4)}, ${next[0].toFixed(4)} ${next[1].toFixed(4)}`);
  }

  return parts.join(' ');
}

export function GeneratedProjectCard({ src, alt, seed = 42 }: GeneratedProjectCardProps) {
  const clipId = `blob-clip-${seed}`;
  const path = blobPath(seed);

  return (
    <div className="generated-card">
      <svg viewBox="0 0 1 1" width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={path} />
          </clipPath>
        </defs>
      </svg>
      <div className="generated-card-inner" style={{ clipPath: `url(#${clipId})` }}>
        <div className="generated-card-sharp">
          <Image src={src} alt={alt} fill sizes="(max-width: 700px) 50vw, 387px" />
        </div>
        <div className="generated-card-blurred">
          <Image src={src} alt="" fill sizes="(max-width: 700px) 50vw, 387px" />
        </div>
      </div>
    </div>
  );
}
