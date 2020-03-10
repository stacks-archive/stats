export enum Providers {
  Segment = 'segment',
}

export interface SegmentConfig {
  name: typeof Providers.Segment;
  writeKey: string;
}

export type Provider = SegmentConfig;

export interface ActionData {
  id: string;
  provider: Provider;
}

export interface Context {
  page: {
    path: string;
    hash?: string;
    origin: string;
    url: string;
  };
}

export interface EventData {
  name: string;
  [key: string]: any;
}

export interface EventAction extends ActionData {
  context: Context;
  eventData: EventData;
}

export interface PageData {
  name: string;
  title?: string;
  href?: string;
  url?: string;
  [key: string]: any;
}

export interface PageAction extends ActionData {
  context: Context;
  pageData: PageData;
}

export enum Actions {
  EVENT = 'event',
  PAGE = 'page',
}

interface BaseRunOptions {
  id: string;
  context: Context;
  providers: Provider[];
}

export interface PageRun extends BaseRunOptions {
  action: typeof Actions.PAGE;
  pageData: PageData;
}

export interface EventRun extends BaseRunOptions {
  action: typeof Actions.EVENT;
  eventData: EventData;
}

export type RunOptions = EventRun | PageRun;
