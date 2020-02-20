export enum Providers {
  Segment = 'segment',
}

export interface SegmentConfig {
  name: typeof Providers.Segment;
  writeKey: string;
}

export type Provider = SegmentConfig;

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

export enum Actions {
  EVENT = 'event',
  PAGE = 'page',
}

export interface RunOptions {
  action: Actions;
  pageData?: PageData;
  eventData?: EventData;
  providers: Provider[];
}
