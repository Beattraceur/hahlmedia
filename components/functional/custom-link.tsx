import { i18n } from "@/i18n.config";
import Link from "next/link";

type CustomLinkProps = {
  href: string;
  lang: string;
  children: React.ReactNode;
  [key: string]: any;
};
// Custom Link component that includes localisation into the destination link, so that the language stays the same even when navigating to another page
export default function CustomLink({
  href,
  lang,
  children,
  ...props
}: CustomLinkProps) {
  const isDefaultLang = lang === i18n.defaultLocale;
  const path = isDefaultLang ? href : `/${lang}${href}`;
  return (
    <Link href={path} {...props}>
      {children}
    </Link>
  );
}
