import './main.css';
import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n.config';
import Header from '@/components/header';

import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';

//default title and description
export const metadata: Metadata = {
  title: 'hahl.media',
  description: 'Media Portfolio by Benjamin Hahl',
};
//integration of i18n for localisation
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
//default root layout
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    //ThemeProvider for day and night mode
    <ThemeProvider attribute='class'>
      <main className='flex items-start justify-between'>
        {/* Header component for loading Sidebar */}
        <Header lang={params.lang} />
        <div className=' w-full h-full overflow-auto'>{children}</div>
        {/* Toaster component for notifications */}
        <Toaster />
      </main>
    </ThemeProvider>
  );
}
