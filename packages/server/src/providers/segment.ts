import { BaseProvider } from './base';
import Segment from 'analytics-node';
import { SegmentConfig, EventAction, PageAction } from '@blockstack/stats';

export class SegmentProvider extends BaseProvider {
  static async event(eventAction: EventAction) {
    const client = this.getClient(eventAction.provider);
    const { eventData } = eventAction;
    const { name, ...rest } = eventData;
    client.track({
      event: name,
      anonymousId: eventAction.id,
      context: eventAction.context,
      properties: {
        ...rest,
      },
    });
    return Promise.resolve();
  }

  static async page(pageAction: PageAction) {
    const client = this.getClient(pageAction.provider);
    const { pageData, context } = pageAction;
    const { name, ...rest } = pageData;
    client.page({
      context,
      anonymousId: pageAction.id,
      name,
      properties: {
        ...rest,
      },
    });
    return Promise.resolve();
  }

  static getClient(provider: SegmentConfig) {
    return new Segment(provider.writeKey || '');
  }
}
