import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ChartType } from '@/lib/types';
import { convertDate } from '@/lib/getDate';
import { useEspData } from '@/lib/espDataFetcher';

type EspData = {
  _id: string;
  rainAmount: number;
  percentageHumidity: number;
  [key: string]: any;
};

const DataChart = forwardRef(({ lang, sensor }: ChartType, ref) => {
  const [buttonLabel, setButtonLabel] = React.useState<string>('');
  const [valueLabel, setValueLabel] = React.useState<string>('');
  const [suffix, setSuffix] = React.useState<string>('');

  const espData = useEspData();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    openDrawer: () => {
      if (triggerRef.current) {
        triggerRef.current.click();
      }
    },
  }));

  React.useEffect(() => {
    switch (sensor) {
      case 'percentageHumidity':
        if (lang === 'de') {
          setButtonLabel('Bodenfeuchte');
          setValueLabel('Feuchte');
        } else {
          setButtonLabel('Soil moisture');
          setValueLabel('Moisture');
        }
        setSuffix('%');
        break;
      case 'rainAmount':
        if (lang === 'de') {
          setButtonLabel('Regenmenge');
          setValueLabel('Ticks');
        } else {
          setButtonLabel('Rain amount');
          setValueLabel('Ticks');
        }
        setSuffix('L');
        break;
      case 'temperature':
        if (lang === 'de') {
          setButtonLabel('Temperatur');
          setValueLabel('Temperatur');
        } else {
          setButtonLabel('Temperature');
          setValueLabel('Temperature');
        }
        setSuffix('°');
        break;
      case 'pressure':
        if (lang === 'de') {
          setButtonLabel('Luftdruck');
          setValueLabel('Druck');
        } else {
          setButtonLabel('Atmospheric pressure');
          setValueLabel('Pressure');
        }
        setSuffix('hPa');
        break;
      case 'windRPM':
        if (lang === 'de') {
          setButtonLabel('Windgeschwindigkeit');
          setValueLabel('Windgeschwindigkeit');
        } else {
          setButtonLabel('Wind speed');
          setValueLabel('Wind speed');
        }
        setSuffix('rpm');
        break;
    }
  }, [sensor, lang]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline' className='select-none' ref={triggerRef}>
          {buttonLabel}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>{buttonLabel}</DrawerTitle>
            <DrawerDescription>
              {lang === 'de' ? 'der letzten 24Std.' : 'in the last 24h'}
            </DrawerDescription>
          </DrawerHeader>
          <div className='p-4 pb-0'>
            <div className='flex items-center justify-center space-x-2'>
              <div className='flex-1 text-center'>
                <div className='text-7xl font-bold tracking-tighter'>
                  {espData.at(-1)?.[sensor]}
                  {suffix}
                </div>
                <div className='text-[0.70rem] uppercase text-muted-foreground'>
                  {lang === 'de' ? 'aktueller Wert' : 'current value'}
                </div>
              </div>
            </div>
            <div className='mt-3 h-[120px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={espData}>
                  <defs>
                    <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='hsl(var(--primary))' />
                      <stop offset='95%' stopColor='hsl(var(--primary))' />
                    </linearGradient>
                  </defs>
                  {sensor === 'pressure' && (
                    <YAxis domain={['auto', 'auto']} hide={true} />
                  )}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      color: 'hsl(var(--foreground))',
                    }}
                    labelFormatter={(value) =>
                      `${convertDate(espData[value]?.timestamp, lang)}`
                    }
                    formatter={(value, name, item, index, payload) => [
                      `${value}${suffix}`,
                      `${valueLabel}`,
                    ]}
                    separator=' = '
                  />
                  <Area
                    type='monotone'
                    dataKey={sensor}
                    stroke='hsl(var(--primary))'
                    fill='url(#colorUv)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
});

DataChart.displayName = 'DataChart';

export default DataChart;
