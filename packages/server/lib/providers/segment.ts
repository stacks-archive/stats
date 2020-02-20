import { BaseProvider } from './base';
import Segment from 'analytics-node';
import { EventData } from '../types';

export class SegmentProvider extends BaseProvider {
  static isEnabled() {
    return !!process.env.SEGMENT_WRITE_KEY;
  }

  static async event(eventData: EventData) {
    const client = this.getClient();
    client.track({
      event: eventData.name,
      ...eventData,
    });
    return Promise.resolve();
  }

  static getClient() {
    return new Segment(process.env.SEGMENT_WRITE_KEY || '');
  }
}
