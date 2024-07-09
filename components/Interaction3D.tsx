'use client';

import { Locale } from '@/i18n.config';
import DataChart from '@/components/custom-ui/DataChart';
import { ComponentClass, FunctionComponent, useRef, useState } from 'react';
import DioramaInfo from './custom-ui/DioramaInfo';
import { PageText } from '@/lib/types';
import { useEspData } from '@/lib/espDataFetcher';
import MainStage from './r3f/MainStage';
type ComponentType<P = {}, S = any> =
  | ComponentClass<P, S>
  | FunctionComponent<P>;
interface DrawableComponent {
  openDrawer: () => void;
}
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

  // Create refs for each DataChart
  const percentageHumidityRef = useRef(null);
  const rainAmountRef = useRef(null);
  const temperatureRef = useRef(null);
  const pressureRef = useRef(null);
  const windRPMRef = useRef(null);

  // Function to open the specific drawer
  const openDrawer = (
    chartRef: React.MutableRefObject<DrawableComponent | null>
  ) => {
    if (chartRef.current) {
      chartRef.current.openDrawer();
    }
  };

  return (
    <>
      <MainStage
        trigger={setTriggeredTopic}
        openDrawer={openDrawer}
        percentageHumidityRef={percentageHumidityRef}
        windRPMRef={windRPMRef}
        lastHourRainAmount={lastHourRainAmount}
        rainAmountRef={rainAmountRef}
        temperatureRef={temperatureRef}
        pressureRef={pressureRef}
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
      <div className='flex flex-col fixed bottom-0  '>
        <DataChart lang={lang} sensor='windRPM' ref={windRPMRef} />
        <DataChart lang={lang} sensor='pressure' ref={pressureRef} />
        <DataChart lang={lang} sensor='rainAmount' ref={rainAmountRef} />
        <DataChart lang={lang} sensor='temperature' ref={temperatureRef} />
        <DataChart
          lang={lang}
          sensor='percentageHumidity'
          ref={percentageHumidityRef}
        />
      </div>
    </>
  );
}
