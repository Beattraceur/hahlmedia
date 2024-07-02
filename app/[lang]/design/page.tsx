import ThemedImage from "@/components/custom-ui/ThemedImage";
import { Locale } from "@/i18n.config";
import { PagePictureLoader, PageTextLoader } from "@/lib/payloadLoader";
import { PagePicture, PageText } from "@/lib/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/custom-ui/Icon";
import { Metadata } from "next";
// Custom page title and description
export const metadata: Metadata = {
  title: "hahl - Media Design",
  description: "Mediadesign Portfolio by Benjamin Hahl",
};

export default async function Design({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  // lang can be "en" or "de" depending on the URL
  // heroPic and heroPic_dark contains the hero image information loaded from the payload CMS. Depending on the current theme a dark and light picture will be displayed
  const heroPic = (await PagePictureLoader({
    slug: "design",
    param: "hero",
  })) as PagePicture;
  const heroPic_dark = (await PagePictureLoader({
    slug: "design_dark",
    param: "hero",
  })) as PagePicture;
  // text loads all text elements in both languages from the payload CMS
  const text = (await PageTextLoader({ slug: "design" })) as PageText;
  // icon Array loads all icons of programs i have worked with relating to media design content
  const iconArray = (await PagePictureLoader({
    slug: "design",
    param: "usage",
  })) as PagePicture[];

  return (
    <>
      {heroPic && (
        <ThemedImage
          heroPic={heroPic}
          heroPic_dark={heroPic_dark}
          classes="w-full max-h-64 object-cover"
        />
      )}
      {text && (
        <div className="p-24 ">
          <h1 className="text-3xl font-bold pb-4">{text[`${lang}_title`]}</h1>
          <p className="pb-4">{text[`${lang}_description`]}</p>
          {/* Display localized tabs for every topic */}
          {text.topics && text.topics?.length > 1 && (
            <Tabs defaultValue={text.topics[0].slug} className="w-full pt-4">
              <TabsList>
                {text.topics?.map((topic) => (
                  <TabsTrigger key={topic.id} value={topic.slug}>
                    {topic[`${lang}_title`]}
                  </TabsTrigger>
                ))}
              </TabsList>
              {/* Display localized content for every topic */}
              {text.topics?.map((topic) => (
                <TabsContent key={topic.id} value={topic.slug}>
                  <h2 className="text-2xl font-semibold pt-4">
                    {topic[`${lang}_title`]}
                  </h2>
                  <p>{topic[`${lang}_description`]}</p>
                  {/* Display localized tabs for every project in topic */}
                  {topic.projects?.map((project) => (
                    <div key={project.id} className="p-4">
                      <h3 className="text-xl ">{project[`${lang}_title`]}</h3>
                      <p>{project[`${lang}_description`]}</p>
                    </div>
                  ))}
                  <div className="mt-10 w-full rounded-lg bg-slate-100 dark:bg-slate-800 p-2 flex flex-wrap justify-center gap-4">
                    {/* Display program icons related to topic */}
                    {iconArray
                      ?.filter((icon) =>
                        icon.topics?.some((obj) => obj.topic === topic.slug)
                      )
                      .map((icon) => (
                        <HoverCard
                          key={icon.id}
                          openDelay={200}
                          closeDelay={100}
                        >
                          <HoverCardTrigger>
                            <Icon icon={icon} />
                          </HoverCardTrigger>
                          <HoverCardContent>
                            {/* Display localized icon description */}
                            <p>{icon[`${lang}`]}</p>
                          </HoverCardContent>
                        </HoverCard>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      )}
    </>
  );
}
