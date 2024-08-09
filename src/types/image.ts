import type { GetPlaiceholderReturn } from 'plaiceholder';

export interface ImgMetadata
  extends Pick<GetPlaiceholderReturn, 'base64'>,
    Pick<GetPlaiceholderReturn['metadata'], 'width' | 'height'> {
  src: string;
}
