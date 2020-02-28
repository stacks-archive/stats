import { BaseProvider } from './base';
import Segment from 'analytics-node';
import { SegmentConfig, EventAction } from '@blockstack/stats';

export class SegmentProvider extends BaseProvider {
  static async event(eventAction: EventAction) {
    const client = this.getClient(eventAction.provider);
    const { eventData } = eventAction;
    client.track({
      event: eventAction.eventData.name,
      anonymousId: eventAction.id,
      ...eventData,
    });
    return Promise.resolve();
  }

  static getClient(provider: SegmentConfig) {
    return new Segment(provider.writeKey || '');
  }
}
