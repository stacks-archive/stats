import { EventAction, Actions, RunOptions, Provider, PageAction } from '@blockstack/stats';

export class BaseProvider {
  static async run({ action, pageData, eventData, id }: RunOptions, provider: Provider) {
    if (action === Actions.EVENT) {
      if (!eventData) {
        throw 'No data provided for event';
      }
      console.log(`${this.name}: sending event.`, eventData);
      return this.event({
        eventData,
        id,
        provider,
      });
    }

    if (!pageData) {
      throw 'No page data provided for page method';
    }
    console.log(`${this.name}: sending page.`, pageData);
    return this.page({
      pageData,
      id,
      provider,
    });
  }

  static async event(_eventAction: EventAction): Promise<void> {
    return Promise.reject(`.event not implemented for ${this.name}`);
  }

  static async page(_pageAction: PageAction): Promise<void> {
    return Promise.reject(`.page not implemented for ${this.name}`);
  }
}
