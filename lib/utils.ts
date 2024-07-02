import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//shadcn tailwind stuff
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
