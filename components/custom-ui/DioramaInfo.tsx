'use client';
import { Locale } from '@/i18n.config';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import { PageText } from '@/lib/types';
import { useEspData } from '@/lib/espDataFetcher';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type EspData = {
  _id: string;
  rainAmount: number;
  percentageHumidity: number;
  [key: string]: any;
};
export default function DioramaInfo({
  lang,
  text,
  triggeredTopic,
  lastHourRainAmount,
}: {
  lang: Locale;
  text: PageText;
  triggeredTopic: string;
}) {
  const [topicLabel, setTopicLabel] = useState<string>('');
  const [valueLabel, setValueLabel] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');
  const { resolvedTheme } = useTheme();
  const espData = useEspData();
  useEffect(() => {
    switch (triggeredTopic) {
      case 'percentageHumidity':
        if (lang === 'de') {
          setTopicLabel('Bodenfeuchte');
          setValueLabel('Feuchte');
        } else {
          setTopicLabel('Soil moisture');
          setValueLabel('Moisture');
        }
        setSuffix('%');
        break;
      case 'rainAmount':
        if (lang === 'de') {
          setTopicLabel('Regenmenge');
          setValueLabel('Ticks');
        } else {
          setTopicLabel('Rain amount');
          setValueLabel('Ticks');
        }
        setSuffix('L');
        break;
      case 'lastHourRainAmount':
        if (lang === 'de') {
          setTopicLabel('Regenmenge');
          setValueLabel('Ticks');
        } else {
          setTopicLabel('Rain amount');
          setValueLabel('Ticks');
        }
        setSuffix('L');
        break;
      case 'temperature':
        if (lang === 'de') {
          setTopicLabel('Temperatur');
          setValueLabel('Temperatur');
        } else {
          setTopicLabel('Temperature');
          setValueLabel('Temperature');
        }
        setSuffix('°');
        break;
      case 'pressure':
        if (lang === 'de') {
          setTopicLabel('Luftdruck');
          setValueLabel('Druck');
        } else {
          setTopicLabel('Atmospheric pressure');
          setValueLabel('Pressure');
        }
        setSuffix('hPa');
        break;
      case 'windRPM':
        if (lang === 'de') {
          setTopicLabel('Windgeschwindigkeit');
          setValueLabel('Windgeschwindigkeit');
        } else {
          setTopicLabel('Wind speed');
          setValueLabel('Wind speed');
        }
        setSuffix('rpm');
        break;
    }
  }, [triggeredTopic]);
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <BsFillInfoCircleFill className='cursor-pointer h-7 w-7 z-50' />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{text[`${lang}_title`]}</DialogTitle>
            {text && (
              <DialogDescription>
                {text[`${lang}_description`]}
                {resolvedTheme === 'dark' ? (
                  <Image
                    src={'/uploads/IoT-Pipeline-Dark.webp'}
                    alt='IoT-Pipeline'
                    width={1280}
                    height={400}
                  />
                ) : (
                  <Image
                    src={'/uploads/IoT-Pipeline-Light.webp'}
                    alt='IoT-Pipeline'
                    width={1280}
                    height={400}
                  />
                )}
              </DialogDescription>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {triggeredTopic && (
        <div className='fixed top-0 right-0 w-40 h-32 mt-6 select-none'>
          <h1>
            {triggeredTopic === 'lastHourRainAmount'
              ? lang === 'de'
                ? 'Stündliche'
                : 'Last hour'
              : triggeredTopic === 'pressure' && lang === 'de'
              ? 'Aktueller'
              : lang === 'de'
              ? 'Aktuelle'
              : 'Current'}
            <br />
            {topicLabel}
          </h1>
          <p>
            {triggeredTopic === 'lastHourRainAmount'
              ? lastHourRainAmount
              : espData.at(-1)?.[triggeredTopic]}{' '}
            {suffix}
          </p>
        </div>
      )}
    </>
  );
}
