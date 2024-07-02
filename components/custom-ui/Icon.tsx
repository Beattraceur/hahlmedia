"use client";

import Image from "next/image";

import { PagePicture } from "@/lib/types";
// Custom icon display component
export default function Icon({
  icon,
  classes,
}: {
  icon: PagePicture;
  classes?: string;
}) {
  return <Image src={icon.url} alt={icon.alt} width={60} height={60} />;
}
