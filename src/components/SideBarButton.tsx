'use client';

import { TextButton } from 'herokwon-ds';

import { useSideBar } from '@stores';

type SideBarButtonProps = Pick<
  React.ComponentPropsWithoutRef<typeof TextButton>,
  'variant'
>;

export default function SideBarButton({ variant }: SideBarButtonProps) {
  const { isActive, setIsActive } = useSideBar();

  return (
    <TextButton
      data-testid="sidebar-button"
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
      onClick={() => setIsActive(!isActive)}
      className="aspect-square w-fit"
    />
  );
}
