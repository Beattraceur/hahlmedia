import ContactForm from "@/components/ContactForm";
import { Locale } from "@/i18n.config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import { Metadata } from "next";

// Custom page title and description
export const metadata: Metadata = {
  title: "hahl - Contact",
  description: "Contact form of hahl.media",
};
export default async function Contact({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  // load dictionaries in this async area to prevent hydration error and deliver it to the ContactForm client component
  const payload = await getPayloadHMR({ config });
  const conform = (
    await payload.find({
      collection: "dictionaries",
      where: { slug: { equals: "conform" } },
    })
  ).docs[0];
  const dic = conform[lang] as { [key: string]: string };

  return (
    <div>
      <ContactForm dic={dic} />
    </div>
  );
}
