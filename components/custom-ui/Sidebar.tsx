'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import ToggleLang from '../functional/toggle-lang';
import Link from 'next/link';
import CustomLink from '../functional/custom-link';

type Props = {
  lang: 'en' | 'de';
  navigation: { [key: string]: string };
};
// Custom sidebar component with side navigation and buttons for changing the theme and language. The sidebar is hidden by default and moves all the page content when opend to the right
export default function Sidebar({ lang, navigation }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <>
      <div
        className={`fixed h-full w-[256px] min-w-[256px] select-none transition-all duration-300 ${
          isOpen ? 'ml-0' : '-ml-64'
        }`}
      >
        <Button
          size='icon'
          variant='outline'
          onClick={toggle}
          className='fixed top-3 left-3 flex flex-col justify-center'
        >
          {/*custom hamburger icon with animation */}
          <span
            className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
              isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
            }`}
          ></span>
          <span
            className={`bg-foreground block transition-all duration-10 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          ></span>
          <span
            className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
              isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
            }`}
          ></span>
        </Button>
        {isOpen && (
          <div className='flex flex-col w-[256px] min-w-[256px] border-r min-h-screen p-3'>
            <div className='flex justify-end'>
              {/* Change theme button */}
              <Button
                variant='secondary'
                size='icon'
                onClick={() =>
                  theme == 'dark' ? setTheme('light') : setTheme('dark')
                }
                className='mr-2'
              >
                {currentTheme == 'dark' ? (
                  <BsFillSunFill />
                ) : (
                  <BsFillMoonStarsFill />
                )}
              </Button>
              {/* Change language button */}
              <ToggleLang />
            </div>
            <div className='grow flex flex-col pt-5'>
              {/* Display navigation links for every page in the navigation dictionary */}
              {Object.keys(navigation).map((key) =>
                key === 'home' ? (
                  <CustomLink
                    key={key}
                    href={'/'}
                    lang={lang}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className={`relative ${
                      hovered ? 'underline-animation' : ''
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
                      hovered ? 'underline-animation' : ''
                    } text-xl py-2`}
                  >
                    {navigation[key as keyof typeof navigation]}
                  </CustomLink>
                )
              )}
            </div>
            {/* some social links in the future */}
            <div className='flex flex-row mb-3'>
              {/* <!-- Linkedin --> */}
              <Link
                href='https://www.linkedin.com/in/benjamin-hahl'
                className='mr-2'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' />
                </svg>
              </Link>
              <Link href='https://github.com/Beattraceur'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                </svg>
              </Link>
            </div>
            {/* Impressum link in the future */}
            <Link href='/impressum'>Impressum / Datenschutz</Link>
            {/* Admin link to enter payload cms */}
            <Link href='/admin'>Payload-Admin</Link>
            {/* Copyright and year of current year */}
            <div> &#169; {new Date().getFullYear()} hahl.media</div>
          </div>
        )}
      </div>
      {/* Sidebar helper to move the page content to the right when the sidebar is open allthough the sidebar is fixed and prevented from scrolling */}
      <div
        className={`h-full w-[256px] min-w-[256px] transition-all duration-300 ${
          isOpen ? 'ml-0' : '-ml-64'
        }`}
      ></div>
    </>
  );
}
