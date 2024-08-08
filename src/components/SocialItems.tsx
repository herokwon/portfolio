'use client';

import { Tooltip } from 'herokwon-ds';
import type {
  AbsolutePosition,
  ElementBaseSize,
} from 'herokwon-ds/dist/src/types';
import Link from 'next/link';

import { socialItems } from '@data';

interface SocialItemsProps extends React.ComponentPropsWithoutRef<'div'> {
  position?: AbsolutePosition;
  size?: ElementBaseSize;
}

export default function SocialItems({
  size = 'md',
  position = 'top-center',
  ...props
}: SocialItemsProps) {
  return (
    <div
      {...props}
      className={`flex w-full items-center justify-center gap-x-4 ${props.className ?? ''}`}
    >
      {socialItems.map((item, index) => (
        <Tooltip
          key={`${item.path}-${index}`}
          position={position}
          content={item.heading}
        >
          <Link
            href={item.path}
            target={item.path.startsWith('mailto') ? '_self' : '_blank'}
            className="opacity-off transition-opacity hover:opacity-bold"
          >
            <item.icon size={size === 'lg' ? 24 : size === 'sm' ? 16 : 20} />
          </Link>
        </Tooltip>
      ))}
    </div>
  );
}
