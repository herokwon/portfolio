import { LuCopyright } from 'react-icons/lu';

import { Logo, SocialItems } from '@components';

export default function BottomBar() {
  const author = process.env.NEXT_PUBLIC_AUTHOR ?? 'HeroKwon';
  const year = new Date().getFullYear();

  return (
    <footer className="my-auto h-200 w-full space-y-2 md:space-y-4">
      <Logo className="mx-auto h-88 opacity-off" />
      <SocialItems />
      <p
        className="flex w-full flex-wrap items-center justify-center gap-x-1 text-sm"
        data-testid="copyright-paragraph"
      >
        <span className="flex items-center justify-center">
          <LuCopyright className="mr-1" />
          {`${year}.`}
        </span>
        <span className="text-center">{`${author} All Rights Reserved.`}</span>
      </p>
    </footer>
  );
}
