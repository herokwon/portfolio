'use client';

import { TextButton, Tooltip } from 'herokwon-ds';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

const radius = 17;

export default function ScrollToTopButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [scrollRatio, setScrollRatio] = useState<number>(0);

  useEffect(() => {
    setScrollRatio(
      window.scrollY /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight),
    );
  }, [pathname]);

  useEffect(() => {
    const onScrollHandle = () => {
      setIsVisible(window.scrollY > 10);
      setScrollRatio(
        window.scrollY /
          (document.documentElement.scrollHeight -
            document.documentElement.clientHeight),
      );
    };

    window.addEventListener('scroll', onScrollHandle);
    return () => window.removeEventListener('scroll', onScrollHandle);
  }, []);

  return (
    isVisible && (
      <div className="fixed bottom-0 right-0 m-4">
        <Tooltip position="top-right" content="최상단으로 가기">
          <TextButton
            label={
              <>
                <FaArrowUp size={20} />
                <svg
                  width={36}
                  height={36}
                  className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 -rotate-90 fill-transparent stroke-light-blue stroke-2 dark:stroke-dark-blue"
                  style={{
                    strokeLinecap: 'round',
                    strokeDasharray: `${2 * Math.PI * radius}, ${2 * Math.PI * radius}`,
                    strokeDashoffset: `${2 * Math.PI * radius * (1 - scrollRatio)}`,
                  }}
                >
                  <circle cx={radius + 1} cy={radius + 1} r={radius} />
                </svg>
              </>
            }
            variant="secondary"
            shape="circle"
            className="shadow-primary-light hover:!bg-light-primary dark:bg-dark-secondary dark:shadow-primary-dark dark:hover:!bg-dark-secondary"
            style={{
              width: `${2 * (radius + 1)}px`,
              height: `${2 * (radius + 1)}px`,
            }}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          />
        </Tooltip>
      </div>
    )
  );
}
