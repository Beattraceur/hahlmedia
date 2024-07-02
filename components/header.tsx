import { Locale } from "@/i18n.config";

import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

import Sidebar from "./custom-ui/Sidebar";
// async Header component is just used to load the localisation for the Sidebar since the sidebar componend is a client component and therefore not able to fetch the localisation from the server
export default async function Header({ lang }: { lang: Locale }) {
  const payload = await getPayloadHMR({ config });
  const sidenav = (
    await payload.find({
      collection: "dictionaries",
      where: { slug: { equals: "sidenav" } },
    })
  ).docs[0];

  const navigation = sidenav[lang] as { [key: string]: string };
  return (
    <header className="z-50">
      <Sidebar lang={lang} navigation={navigation} />
    </header>
  );
}
