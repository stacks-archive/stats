import { EventData, PageData } from '../types';

export enum Actions {
  EVENT = 'event',
  PAGE = 'page',
}

export interface RunOptions {
  action: Actions;
  pageData?: PageData;
  eventData?: EventData;
}

export class BaseAdapter {
  static async run({ action, pageData, eventData }: RunOptions) {
    if (!this.isEnabled()) {
      return;
    }

    if (action === Actions.EVENT) {
      if (!eventData) {
        throw 'No data provided for event';
      }
      return this.event(eventData);
    }

    if (!pageData) {
      throw 'No page data provided for page method';
    }
    return this.page(pageData);
  }

  static isEnabled(): boolean {
    throw `isEnabled is not implemented for ${this.name}`;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/require-await
  static async event(_eventData: EventData): Promise<void> {
    throw `.event not implemented for ${this.name}`;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/require-await
  static async page(_pageData: PageData): Promise<void> {
    throw `.page not implemented for ${this.name}`;
  }
}
