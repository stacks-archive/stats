import { BaseProvider } from './providers/base';
import { SegmentProvider } from './providers/segment';
import { RunOptions, Providers } from '@blockstack/stats';
import { Request } from 'express';
import { UAParser } from 'ua-parser-js';

const nameToProvider = {
  [Providers.Segment]: SegmentProvider,
};

export const exportToProviders = async (opts: RunOptions, req: Request) => {
  const providersConfig = opts.providers || [];
  const providers: (typeof BaseProvider | undefined)[] = providersConfig.map(provider => nameToProvider[provider.name]);
  const runs = providers.map(async (provider, index) => await provider?.run(opts, providersConfig[index], req));
  await Promise.all(runs);
};

export const getUserAgent = (req: Request) => {
  const header = req.headers['user-agent'];
  if (!header) {
    return null;
  }
  const ua = new UAParser(req.headers['user-agent']);
  return ua;
};
