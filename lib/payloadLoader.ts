import "server-only";

import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

export async function PageTextLoader({ slug }: { slug: string }) {
  const payload = await getPayloadHMR({ config });
  const pageContent = (
    await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
    })
  ).docs[0];

  return pageContent;
}

export async function PagePictureLoader({
  slug,
  param,
}: {
  slug: string;
  param: string;
}) {
  const payload = await getPayloadHMR({ config });

  const mediaContent =
    param === "hero"
      ? (
          await payload.find({
            collection: "media",
            where: { hero: { equals: slug } },
          })
        ).docs[0]
      : param === "usage"
      ? (
          await payload.find({
            collection: "media",
            where: { usage: { contains: slug } },
            // limit needs to be raised because payload uses pagination fetching of 10 items by default
            limit: 100,
          })
        ).docs
      : null;

  return mediaContent;
}
