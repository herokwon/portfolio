'use client';

import { EmptyImage } from 'herokwon-ds';
import Image from 'next/image';

import type { ImgMetadata } from '@types';

interface ArticleThumbnailProps {
  metadata: ImgMetadata | null;
}

const ArticleThumbnail = ({ metadata }: ArticleThumbnailProps) => {
  return (
    <div className="relative mb-2 flex aspect-[4/3] w-full items-center justify-center">
      {!metadata ? (
        <EmptyImage className="m-0 !aspect-square !h-fit !w-1/2 object-scale-down opacity-bold" />
      ) : (
        <Image
          fill
          src={metadata.src}
          className="object-cover object-center transition-transform group-hover:scale-105"
          style={{
            aspectRatio: `${metadata.width} / ${metadata.height}`,
          }}
          alt="article-thumbnail"
        />
      )}
    </div>
  );
};

export default ArticleThumbnail;
