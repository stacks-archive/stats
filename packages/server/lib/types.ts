export interface EventData {
  name: string;
  [key: string]: any;
}

export interface PageData {
  name: string;
  title?: string;
  href?: string;
  url?: string;
  [key: string]: any;
}

export type EitherData = PageData | EventData;
