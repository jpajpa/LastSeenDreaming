import type { CSSProperties, ReactNode } from 'react';

type Point = {
  x: number;
  y: number;
};

type BlobFrameProps = {
  children: ReactNode;
  className?: string;
  preClipped?: boolean;
  seed: string;
};

function hashSeed(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createRandom(seed: number) {
  let state = seed;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const coordinate = (value: number) => value.toFixed(4);

function createBlobPath(seed: number) {
  const random = createRandom(seed);
  const pointCount = 8;
  const phase = (random() - 0.5) * 0.22;
  const points: Point[] = [];

  for (let index = 0; index < pointCount; index += 1) {
    const angle = -Math.PI / 2
      + phase
      + (index / pointCount) * Math.PI * 2
      + (random() - 0.5) * 0.16;
    const xRadius = 0.42 + random() * 0.055;
    const yRadius = 0.41 + random() * 0.065;

    points.push({
      x: 0.5 + Math.cos(angle) * xRadius,
      y: 0.5 + Math.sin(angle) * yRadius,
    });
  }

  const first = points[0];
  let path = `M ${coordinate(first.x)} ${coordinate(first.y)}`;
  const smoothing = 0.9 / 6;

  for (let index = 0; index < pointCount; index += 1) {
    const previous = points[(index - 1 + pointCount) % pointCount];
    const current = points[index];
    const next = points[(index + 1) % pointCount];
    const afterNext = points[(index + 2) % pointCount];
    const firstControl = {
      x: current.x + (next.x - previous.x) * smoothing,
      y: current.y + (next.y - previous.y) * smoothing,
    };
    const secondControl = {
      x: next.x - (afterNext.x - current.x) * smoothing,
      y: next.y - (afterNext.y - current.y) * smoothing,
    };

    path += ` C ${coordinate(firstControl.x)} ${coordinate(firstControl.y)}, ${coordinate(secondControl.x)} ${coordinate(secondControl.y)}, ${coordinate(next.x)} ${coordinate(next.y)}`;
  }

  return `${path} Z`;
}

export function BlobFrame({ children, className = '', preClipped = false, seed }: BlobFrameProps) {
  const hashedSeed = hashSeed(seed);
  const frameClassName = `blob-frame${preClipped ? ' blob-frame--preclipped' : ''}${className ? ` ${className}` : ''}`;

  if (preClipped) {
    return <div className={frameClassName}>{children}</div>;
  }

  const clipPathId = `blob-${hashedSeed.toString(36)}`;
  const clipPathUrl = `url(#${clipPathId})`;
  const clipStyle: CSSProperties = {
    clipPath: clipPathUrl,
    WebkitClipPath: clipPathUrl,
  };

  return <>
    <svg className="blob-clip-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
          <path d={createBlobPath(hashedSeed)} />
        </clipPath>
      </defs>
    </svg>
    <div className={frameClassName} style={clipStyle}>{children}</div>
  </>;
}
