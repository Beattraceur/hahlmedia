import React from 'react';
import { Locale } from '@/i18n.config';
import { PageTextLoader } from '@/lib/payloadLoader';
import { PageText } from '@/lib/types';
import Interaction3D from '@/components/Interaction3D';
export default async function page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const text = (await PageTextLoader({ slug: 'diorama' })) as PageText;
  return <Interaction3D lang={lang} text={text} />;
}
