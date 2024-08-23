'use client';

import { Backdrop, Heading } from 'herokwon-ds';
import { useEffect } from 'react';

import { useSideBar } from '@stores';

import { ArticleList } from '@features/article';

import { NavItems, SideBarButton } from '@components';

type SideBarProps = {
  articles?: React.ReactNode;
};

export default function SideBar({ articles }: SideBarProps) {
  const { isActive, setIsActive } = useSideBar();

  useEffect(() => {
    const onResizeHandle = () => {
      isActive && !(window.innerWidth < 768) && setIsActive(false);
    };

    window.addEventListener('resize', onResizeHandle);
    return () => window.removeEventListener('resize', onResizeHandle);
  }, [isActive, setIsActive]);

  return (
    <Backdrop
      isActive={isActive}
      onClick={() => setIsActive(false)}
      className="overflow-y-auto"
    >
      <aside
        className={`flex min-h-screen max-w-[384px] flex-col gap-y-8 px-4 transition-opacity ${isActive ? 'sidebar-active' : 'pointer-events-none opacity-0'}`}
      >
        <div className="flex h-48 w-full items-center justify-start">
          <SideBarButton />
        </div>
        <NavItems
          className={`w-full flex-col gap-y-4 px-1 transition-all *:w-full ${isActive ? '' : 'translate-y-4 opacity-0'}`}
        />
        <section
          className={`w-full transition-all delay-150 ${isActive ? '' : 'translate-y-4 opacity-0'}`}
        >
          <Heading as="h2" className="mb-2 text-[1rem]">
            최근 게시글
          </Heading>
          <ArticleList
            hasPagination={false}
            totalPageNumber={1}
            className="first:*:gap-y-2"
          >
            {articles}
          </ArticleList>
        </section>
      </aside>
    </Backdrop>
  );
}
