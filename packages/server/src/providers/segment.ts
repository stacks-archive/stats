import { BaseProvider } from './base';
import Segment from 'analytics-node';
import { SegmentConfig, EventAction, PageAction } from '@blockstack/stats';
import { Request } from 'express';
import { getUserAgent } from '../utils';

export class SegmentProvider extends BaseProvider {
  static async event(eventAction: EventAction, req: Request) {
    const client = this.getClient(eventAction.provider);
    const { eventData, context } = eventAction;
    const { name, ...rest } = eventData;
    client.track({
      event: name,
      anonymousId: eventAction.id,
      context: {
        ...context,
        ...this.getUAContext(req),
      },
      properties: {
        ...rest,
      },
    });
    return Promise.resolve();
  }

  static async page(pageAction: PageAction, req: Request) {
    const client = this.getClient(pageAction.provider);
    const { pageData, context } = pageAction;
    const { name, ...rest } = pageData;
    client.page({
      context: {
        ...context,
        ...this.getUAContext(req),
      },
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

  static getUAContext(req: Request) {
    const ua = getUserAgent(req);
    if (!ua) {
      return {};
    }
    const os = ua.getOS();
    const device = ua.getDevice();
    return {
      os,
      device: {
        manufacturer: device.vendor,
        model: device.model,
        type: device.type,
      },
    };
  }
}
