import Image from 'next/image';

import LogoImage from '@public/logo.png';

type LogoProps = Omit<
  React.ComponentPropsWithoutRef<typeof Image>,
  'src' | 'alt'
>;

export default function Logo({ ...props }: LogoProps) {
  return (
    <Image
      {...props}
      src={LogoImage}
      className={`aspect-auto h-full w-fit ${props.className ?? ''}`}
      alt="logo"
    />
  );
}
