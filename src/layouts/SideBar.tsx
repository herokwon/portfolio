'use client';

import { Backdrop } from 'herokwon-ds';
import { useEffect } from 'react';

import { useSideBar } from '@stores';

import { NavItems, SideBarButton } from '@components';

export default function SideBar() {
  const { isActive, setIsActive } = useSideBar();

  useEffect(() => {
    const onResizeHandle = () => {
      isActive && !(window.innerWidth < 768) && setIsActive(false);
    };

    window.addEventListener('resize', onResizeHandle);
    return () => window.removeEventListener('resize', onResizeHandle);
  }, [isActive, setIsActive]);

  return (
    <Backdrop isActive={isActive} onClick={() => setIsActive(false)}>
      <aside
        className={`flex min-h-screen max-w-[300px] flex-col gap-y-8 px-4 transition-opacity ${isActive ? 'sidebar-active' : 'pointer-events-none opacity-0'}`}
      >
        <div className="flex h-48 w-full items-center justify-start">
          <SideBarButton />
        </div>
        <NavItems
          className={`w-full flex-col gap-y-4 px-1 transition-all *:w-full ${isActive ? '' : 'translate-y-4 opacity-0'}`}
        />
      </aside>
    </Backdrop>
  );
}
