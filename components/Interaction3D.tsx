'use client';
import { Locale } from '@/i18n.config';
import DataChart from '@/components/custom-ui/DataChart';
import Stage from '@/components/r3f/Stage';
import { use, useRef, useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import DioramaInfo from './custom-ui/DioramaInfo';
import { PageText } from '@/lib/types';
import { useEspData } from '@/lib/espDataFetcher';
import MainStage from './r3f/MainStage';
export default function Interaction3D({
  lang,
  text,
}: {
  lang: Locale;
  text: PageText;
}) {
  const espData = useEspData();
  const [triggeredTopic, setTriggeredTopic] = useState('');
  const lastSixEntries = espData.slice(-6);
  const lastHourRainAmount = lastSixEntries.reduce(
    (sum, entry) => sum + (entry.rainAmount || 0),
    0
  );
  return (
    <>
      <MainStage
        trigger={setTriggeredTopic}
        lastHourRainAmount={lastHourRainAmount}
      />
      <div className='fixed top-3 right-3'>
        {text && (
          <DioramaInfo
            lang={lang}
            text={text}
            triggeredTopic={triggeredTopic}
            lastHourRainAmount={lastHourRainAmount}
          />
        )}
      </div>
      <div className='fixed bottom-0 left-auto'>
        <DataChart lang={lang} sensor={'percentageHumidity'} />
        <DataChart lang={lang} sensor={'rainAmount'} />
        <DataChart lang={lang} sensor={'temperature'} />
        <DataChart lang={lang} sensor={'pressure'} />
        <DataChart lang={lang} sensor={'windRPM'} />
      </div>
    </>
  );
}
