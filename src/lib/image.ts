'use server';

import { getPlaiceholder } from 'plaiceholder';

import { ImgMetadata } from '@types';

export const getImgMetadata = async (
  src: string,
): Promise<ImgMetadata | null> => {
  if (src.length === 0) return null;

  try {
    const response = await fetch(src);
    const buffer = Buffer.from(await response.arrayBuffer());

    const {
      metadata: { width, height },
      ...plaiceholder
    } = await getPlaiceholder(buffer, { size: 10 });

    return {
      src,
      width,
      height,
      base64: plaiceholder.base64,
    };
  } catch {
    return null;
  }
};
