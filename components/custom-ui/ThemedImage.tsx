"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { PagePicture } from "@/lib/types";

// Component that desides which hero picture should be displayed based on the current theme
export default function ThemedImage({
  heroPic,
  heroPic_dark,
  classes,
}: {
  heroPic: PagePicture;
  heroPic_dark: PagePicture;
  classes?: string;
}) {
  const { resolvedTheme } = useTheme();
  if (resolvedTheme == "dark" && heroPic_dark) {
    return (
      <Image
        src={heroPic_dark.url}
        alt={heroPic_dark.alt}
        width={heroPic_dark.width}
        height={heroPic_dark.height}
        className={classes}
      />
    );
  } else
    return (
      <Image
        src={heroPic.url}
        alt={heroPic.alt}
        width={heroPic.width}
        height={heroPic.height}
        className={classes}
      />
    );
}
