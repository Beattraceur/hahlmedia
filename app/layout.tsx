import "./globals.css";

import { Locale, i18n } from "@/i18n.config";

//integration of i18n for localisation in the outer html element
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
//Outer layout to use Tailwind CSS in payload backend giving the option to override the payload styles
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
