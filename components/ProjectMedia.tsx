import Image from 'next/image';
import type { MediaItem } from '@/lib/projects';

type ProjectMediaProps = {
  media: MediaItem;
  alt?: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  controls?: boolean;
  autoPlay?: boolean;
};

export function ProjectMedia({
  media,
  alt,
  className,
  fill = false,
  sizes,
  priority = false,
  controls = false,
  autoPlay = false,
}: ProjectMediaProps) {
  if (media.type === 'video') {
    return (
      <video
        className={`${className || ''}${fill ? ' project-media-fill' : ''}`.trim()}
        src={media.src}
        aria-label={alt ?? media.alt}
        controls={controls}
        autoPlay={autoPlay}
        muted={autoPlay}
        loop={autoPlay}
        playsInline
        preload={autoPlay ? 'auto' : 'metadata'}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={media.src}
        alt={alt ?? media.alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={media.src}
      alt={alt ?? media.alt}
      className={className}
      width={media.width || 1800}
      height={media.height || 1200}
      sizes={sizes}
      priority={priority}
    />
  );
}
