import { EventData, PageData, Actions, RunOptions } from '../types';

export class BaseAdapter {
  static async run({ action, pageData, eventData }: RunOptions) {
    if (!this.isEnabled()) {
      console.log(`${this.name}: not enabled.`);
      return;
    }

    if (action === Actions.EVENT) {
      if (!eventData) {
        throw 'No data provided for event';
      }
      console.log(`${this.name}: sending event.`, eventData);
      return this.event(eventData);
    }

    if (!pageData) {
      throw 'No page data provided for page method';
    }
    console.log(`${this.name}: sending page.`, pageData);
    return this.page(pageData);
  }

  static isEnabled(): boolean {
    throw `isEnabled is not implemented for ${this.name}`;
  }

  static async event(_eventData: EventData): Promise<void> {
    return Promise.reject(`.event not implemented for ${this.name}`);
  }

  static async page(_pageData: PageData): Promise<void> {
    return Promise.reject(`.page not implemented for ${this.name}`);
  }
}
