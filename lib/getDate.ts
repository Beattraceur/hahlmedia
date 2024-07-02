import { format, subDays } from "date-fns";

export function getDate(sub: number = 0) {
  const dateXDaysAgo = subDays(new Date(), sub);
  return format(dateXDaysAgo, "dd/MM/yyyy");
}

export function convertDate(date: string, lang: "de" | "en") {
  //date = 2024-06-03T23:55:17+02:00
  //convert into hh:mm dd/MM/yyyy if lang is de

  return lang === "de"
    ? format(new Date(date), "dd.MM.yyyy") +
        " um " +
        format(new Date(date), "HH:mm") +
        " Uhr"
    : format(new Date(date), "dd MMMM yyyy") +
        " at " +
        format(new Date(date), "HH:mm aaa");
}
