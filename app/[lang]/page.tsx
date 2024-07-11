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

  const text = (await PageTextLoader({ slug: 'home' })) as PageText;

  return (
    <>
      {/* display hero picture when set in payload */}
      {/* {Pic && (
        <ThemedImage
          Pic={Pic}
          Pic_dark={Pic_dark}
          classes='w-full max-h-64 object-cover'
        />
      )} */}
      {/* display page text when set in payload */}
      {text && (
        <div className='w-screen h-screen flex justify-center'>
          <div className='p-24 flex flex-col gap-4 max-w-screen-xl '>
            <h1 className='text-3xl font-bold '>{text[`${lang}_title`]}</h1>
            <p>{text[`${lang}_description`]}</p>
            {text.topics && (
              <div>
                <h1 className='text-3xl font-bold '>
                  {text.topics[0][`${lang}_title`]}
                </h1>

                <p className='pt-4'>{text.topics[0][`${lang}_description`]}</p>
              </div>
            )}

            {text &&
              text.topics &&
              text.topics[0].projects?.map((project) => (
                <div key={project.id} className='pt-4'>
                  <h3 className='text-xl '>{project[`${lang}_title`]}</h3>
                  <p>{project[`${lang}_description`]}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
