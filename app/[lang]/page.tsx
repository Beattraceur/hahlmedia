import React from 'react';
import ThemedImage from '@/components/custom-ui/ThemedImage';
import { Locale } from '@/i18n.config';
import { PageTextLoader } from '@/lib/payloadLoader';
import { PageText } from '@/lib/types';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const text = (await PageTextLoader({ slug: 'home' })) as PageText;

  return (
    <>
      {text && (
        <div className='w-full flex justify-center'>
          <div className='pt-16 px-12 flex flex-col gap-4 max-w-screen-xl pb-32'>
            <h1 className='text-3xl font-bold'>{text[`${lang}_title`]}</h1>
            <p>{text[`${lang}_description`]}</p>
            {text.topics && (
              <div className='flex flex-col'>
                <h1 className='text-3xl font-bold'>
                  {text.topics[0][`${lang}_title`]}
                </h1>
                <ThemedImage
                  picName={'Lighthouse'}
                  width={600}
                  height={600}
                  classes='self-center'
                />
                <p className='pt-4'>{text.topics[0][`${lang}_description`]}</p>
              </div>
            )}
            <ThemedImage
              picName={'IoT-Pipeline'}
              width={640}
              height={200}
              classes='self-center'
            />
            {text &&
              text.topics &&
              text.topics[0].projects?.map((project) => (
                <div key={project.id} className='pt-4'>
                  <h3 className='text-xl'>{project[`${lang}_title`]}</h3>
                  <p>{project[`${lang}_description`]}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
