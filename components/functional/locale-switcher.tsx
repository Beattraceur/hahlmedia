"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { i18n } from "@/i18n.config";
//Local switcher component that handles the url redirection based on the current language
export default function LocaleSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    {
      /* redirect to home if pathname is missing */
    }
    if (!pathName) return "/";
    {
      /*generate localized pathName based on the current language when missing */
    }
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
      if (locale === i18n.defaultLocale) return pathName;
      return `/${locale}${pathName}`;
    } else {
      {
        /*hide the default locale from the url */
      }
      if (locale === i18n.defaultLocale) {
        const segments = pathName.split("/");
        const isHome = segments.length === 2;
        if (isHome) return "/";
        segments.splice(1, 1);
        return segments.join("/");
      }
      const segments = pathName.split("/");
      segments[1] = locale;
      return segments.join("/");
    }
  };
  return (
    //generate side menu based on the current language
    <ul className="flex gap-x-3">
      {i18n.locales.map((locale) => {
        return (
          <li key={locale}>
            <Link
              href={redirectedPathName(locale)}
              className="rounded-md border bg-black px-3 py-2 text-white"
            >
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
