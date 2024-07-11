'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { PagePicture } from '@/lib/types';

export default function ThemedImage({
  Pic,
  Pic_dark,
  classes,
}: {
  Pic: PagePicture;
  Pic_dark: PagePicture;
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
        width={Pic_dark.width}
        height={Pic_dark.height}
        className={classes}
      />
    );
  else if (theme === 'dark' && Pic_dark) {
    return (
      <Image
        src={Pic_dark.url}
        alt={Pic_dark.alt}
        width={Pic_dark.width}
        height={Pic_dark.height}
        className={classes}
      />
    );
  } else {
    return (
      <Image
        src={Pic.url}
        alt={Pic.alt}
        width={Pic.width}
        height={Pic.height}
        className={classes}
      />
    );
  }
}
