'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { PagePicture } from '@/lib/types';

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
  const [theme, setTheme] = useState('loading');

  useEffect(() => {
    if (resolvedTheme) {
      setTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  if (theme === 'loading')
    return (
      <Image
        src={''}
        alt={''}
        width={width}
        height={height}
        className={classes}
      />
    );
  else if (theme === 'dark') {
    return (
      <Image
        src={`/pictures/dark_${picName}${suffix}`}
        alt={picName}
        width={width}
        height={height}
        className={classes}
      />
    );
  } else {
    return (
      <Image
        src={`/pictures/light_${picName}${suffix}`}
        alt={picName}
        width={width}
        height={height}
        className={classes}
      />
    );
  }
}
