import React from 'react';
import ThemedImage from '@/components/custom-ui/ThemedImage';
import { Locale } from '@/i18n.config';
import { PagePictureLoader, PageTextLoader } from '@/lib/payloadLoader';
import { PagePicture, PageText } from '@/lib/types';
//Picture from public/models
import bild from '@/public/models/bild.jpg';

import Link from 'next/link';
import Image from 'next/image';
import Interaction3D from '@/components/Interaction3D';
import DioramaInfo from '@/components/custom-ui/DioramaInfo';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  // lang can be "en" or "de" depending on the URL
  // heroPic and heroPic_dark contains the hero image information loaded from the payload CMS. Depending on the current theme a dark and light picture will be displayed
  const heroPic = (await PagePictureLoader({
    slug: 'home',
    param: 'hero',
  })) as PagePicture;
  const heroPic_dark = (await PagePictureLoader({
    slug: 'home_dark',
    param: 'hero',
  })) as PagePicture;
  // text loads all text elements in both languages from the payload CMS

  const text = (await PageTextLoader({ slug: 'home' })) as PageText;
  return (
    <>
      {/* display hero picture when set in payload */}
      {/* {heroPic && (
        <ThemedImage
          heroPic={heroPic}
          heroPic_dark={heroPic_dark}
          classes="w-full max-h-64 object-cover"
        />
      )} */}
      {/* display page text when set in payload */}
      {text && (
        <div className='p-24'>
          <h1 className='text-3xl font-bold '>{text[`${lang}_title`]}</h1>
          <p>{text[`${lang}_description`]}</p>
        </div>
      )}
    </>
  );
}
