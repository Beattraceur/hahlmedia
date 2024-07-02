"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import ToggleLang from "../functional/toggle-lang";
import Link from "next/link";
import CustomLink from "../functional/custom-link";

type Props = {
  lang: "en" | "de";
  navigation: { [key: string]: string };
};
// Custom sidebar component with side navigation and buttons for changing the theme and language. The sidebar is hidden by default and moves all the page content when opend to the right
export default function Sidebar({ lang, navigation }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <>
      <div
        className={`fixed h-full w-[256px] min-w-[256px] transition-all duration-300 ${
          isOpen ? "ml-0" : "-ml-64"
        }`}
      >
        <Button
          size="icon"
          variant="outline"
          onClick={toggle}
          className="fixed top-3 left-3 flex flex-col justify-center"
        >
          {/*custom hamburger icon with animation */}
          <span
            className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
              isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
          ></span>
          <span
            className={`bg-foreground block transition-all duration-10 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
              isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            }`}
          ></span>
        </Button>
        {isOpen && (
          <div className="flex flex-col w-[256px] min-w-[256px] border-r min-h-screen p-3">
            <div className="flex justify-end">
              {/* Change theme button */}
              <Button
                variant="secondary"
                size="icon"
                onClick={() =>
                  theme == "dark" ? setTheme("light") : setTheme("dark")
                }
                className="mr-2"
              >
                {currentTheme == "dark" ? (
                  <BsFillSunFill />
                ) : (
                  <BsFillMoonStarsFill />
                )}
              </Button>
              {/* Change language button */}
              <ToggleLang />
            </div>
            <div className="grow flex flex-col pt-5">
              {/* Display navigation links for every page in the navigation dictionary */}
              {Object.keys(navigation).map((key) =>
                key === "home" ? (
                  <CustomLink
                    key={key}
                    href={"/"}
                    lang={lang}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className={`relative ${
                      hovered ? "underline-animation" : ""
                    } text-xl py-2`}
                  >
                    {navigation[key as keyof typeof navigation]}
                  </CustomLink>
                ) : (
                  <CustomLink
                    key={key}
                    href={`/${key}`}
                    lang={lang}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className={`relative ${
                      hovered ? "underline-animation" : ""
                    } text-xl py-2`}
                  >
                    {navigation[key as keyof typeof navigation]}
                  </CustomLink>
                )
              )}
            </div>
            {/* some social links in the future */}
            <div>Social</div>
            {/* Impressum link in the future */}
            <div>Impressum</div>
            {/* Admin link to enter payload cms */}
            <Link href="/admin">Payload-Admin</Link>
            {/* Copyright and year of current year */}
            <div> &#169; {new Date().getFullYear()} hahl.media</div>
          </div>
        )}
      </div>
      {/* Sidebar helper to move the page content to the right when the sidebar is open allthough the sidebar is fixed and prevented from scrolling */}
      <div
        className={`h-full w-[256px] min-w-[256px] transition-all duration-300 ${
          isOpen ? "ml-0" : "-ml-64"
        }`}
      ></div>
    </>
  );
}
