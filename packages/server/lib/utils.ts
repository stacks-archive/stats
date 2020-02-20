import { BaseProvider } from './providers/base';
import { SegmentProvider } from './providers/segment';
import { RunOptions, Providers } from './types';

const nameToProvider = {
  [Providers.Segment]: SegmentProvider,
};

export const exportToProviders = async (opts: RunOptions) => {
  const providers: (typeof BaseProvider | undefined)[] = opts.providers.map(provider => nameToProvider[provider.name]);
  const runs = providers.map(async provider => await provider?.run(opts));
  await Promise.all(runs);
};
