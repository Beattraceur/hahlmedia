import { Dispatch, SetStateAction } from 'react';

//types to make TypeScript happy
export type PageText = {
  id: number;
  name: string;
  slug: string;
  en_title?: string;
  de_title?: string;
  en_description?: string;
  de_description?: string;
  topics?: Topic[];
  updatedAt: Date;
  createdAt: Date;
};

type Topic = {
  id: string;
  slug: string;
  en_title?: string;
  de_title?: string;
  en_description?: string;
  de_description?: string;
  projects?: Topic[];
};

export type PagePicture = {
  id: number;
  alt: string;
  hero?: string;
  usage?: string[];
  en?: string;
  de?: string;
  topics?: PictureTopic[];
  updatedAt: Date;
  createdAt: Date;
  url: string;
  thumbnailURL: null;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  sizes: Sizes;
};

export type Sizes = {
  thumbnail: Card;
  card: Card;
  tablet: Card;
};

export type Card = {
  url: null;
  width: null;
  height: null;
  mimeType: null;
  filesize: null;
  filename: null;
};

export type PictureTopic = {
  id: string;
  topic: string;
};

export type ChartType = {
  lang: 'en' | 'de';
  sensor: string;
};

export type TriggerType = {
  trigger: Dispatch<SetStateAction<string>>;
};

export type DrawableComponent = {
  openDrawer: () => void;
};

export type InheritedProps = {
  trigger: Dispatch<SetStateAction<string>>;
  lastHourRainAmount?: number;
  openDrawer: (chartRef: React.MutableRefObject<DrawableComponent>) => void;
  percentageHumidityRef?: React.MutableRefObject<null>;
  windRPMRef?: React.MutableRefObject<null>;
  rainAmountRef?: React.MutableRefObject<null>;
  temperatureRef?: React.MutableRefObject<null>;
  pressureRef?: React.MutableRefObject<null>;
};
