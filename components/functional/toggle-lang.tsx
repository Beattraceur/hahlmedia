"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import { i18n } from "@/i18n.config";
import { Button } from "../ui/button";

//Local switcher component that handles the url redirection based on the current language
export default function ToggleLang() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    {
      /* redirect to home if pathname is missing */
    }
    if (!pathName) return "/";
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
    <Link
      href={redirectedPathName(
        //show the right button label based on the opposite language. Check for 'de' since it is the only language that can be found in the url. Check for "/de/" because for instance "/design" also starts with "/de...". Second check is needed because the home route in german is "/de" not "/de/".
        pathName.startsWith("/de/") || pathName.endsWith("/de")
          ? i18n.locales[0]
          : i18n.locales[1]
      )}
    >
      <Button size="icon" variant="secondary" className="mr-2">
        {pathName.startsWith("/de/") || pathName.endsWith("/de") ? (
          // display language flag
          <ReactCountryFlag
            countryCode="GB"
            svg
            style={{
              width: "2em",
              height: "2em",
            }}
          />
        ) : (
          <ReactCountryFlag
            countryCode="DE"
            svg
            style={{
              width: "2em",
              height: "2em",
            }}
          />
        )}
      </Button>
    </Link>
  );
}
