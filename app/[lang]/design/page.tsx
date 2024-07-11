import ThemedImage from '@/components/custom-ui/ThemedImage';
import { Locale } from '@/i18n.config';
import { PagePictureLoader, PageTextLoader } from '@/lib/payloadLoader';
import { PagePicture, PageText } from '@/lib/types';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/custom-ui/Icon';
import { Metadata } from 'next';
// Custom page title and description
export const metadata: Metadata = {
  title: 'hahl - Media Design',
  description: 'Mediadesign Portfolio by Benjamin Hahl',
};

export default async function Design({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  // lang can be "en" or "de" depending on the URL
  // heroPic and heroPic_dark contains the hero image information loaded from the payload CMS. Depending on the current theme a dark and light picture will be displayed

  // text loads all text elements in both languages from the payload CMS
  const text = (await PageTextLoader({ slug: 'design' })) as PageText;
  // icon Array loads all icons of programs i have worked with relating to media design content

  return <></>;
}
