'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function ThemedImage({
  picName,
  width,
  height,
  suffix = '.webp',
  classes,
}: {
  picName: string;
  width: number;
  height: number;
  suffix?: string;
  classes?: string;
}) {
  const { resolvedTheme } = useTheme();
  const [theme, setTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (resolvedTheme) {
      setTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  if (!theme) {
    return (
      <div
        style={{ width, height, position: 'relative' }}
        className='self-center'
      >
        <div className='w-full h-full flex items-center justify-center'>
          <div
            className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
            role='status'
          >
            <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
              Loading...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <picture className={classes}>
      <source
        srcSet={`/pictures/${
          theme === 'dark' ? 'dark' : 'light'
        }_${picName}${suffix}`}
        type='image/webp'
      />
      <Image
        src={`/pictures/${
          theme === 'dark' ? 'dark' : 'light'
        }_${picName}${suffix}`}
        alt={picName}
        width={width}
        height={height}
      />
    </picture>
  );
}
