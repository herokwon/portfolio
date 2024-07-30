'use client';

import { TextButton } from 'herokwon-ds';
import { useState } from 'react';

type SideBarButtonProps = Pick<
  React.ComponentPropsWithoutRef<typeof TextButton>,
  'variant'
>;

export default function SideBarButton({ variant }: SideBarButtonProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <TextButton
      label={
        <div className="flex h-15 w-20 flex-col justify-between *:h-3 *:rounded-ms *:bg-black *:transition-all dark:*:bg-white">
          <span
            className={
              isActive ? 'translate-y-[6px] rotate-45 scale-x-105' : ''
            }
          />
          <span className={isActive ? 'scale-x-0' : ''} />
          <span
            className={
              isActive ? '-translate-y-[6px] -rotate-45 scale-x-105' : ''
            }
          />
        </div>
      }
      variant={variant}
      spacing="compact"
      onClick={() => setIsActive(prev => !prev)}
      className="aspect-square w-fit"
    />
  );
}
