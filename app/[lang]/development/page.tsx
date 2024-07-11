import ThemedImage from '@/components/custom-ui/ThemedImage';
import { Locale } from '@/i18n.config';
import { PageTextLoader } from '@/lib/payloadLoader';
import { PagePicture, PageText } from '@/lib/types';
import { Metadata } from 'next';
//Comments found in "home"-page
export const metadata: Metadata = {
  title: 'hahl - Media Development',
  description: 'Mediadevelopment Portfolio by Benjamin Hahl',
};
export default async function Development({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const text = (await PageTextLoader({ slug: 'development' })) as PageText;

  return (
    <>
      {text && (
        <div className='p-24 '>
          <h1 className='text-3xl font-bold '>{text[`${lang}_title`]}</h1>
          <p>{text[`${lang}_description`]}</p>
        </div>
      )}
    </>
  );
}
