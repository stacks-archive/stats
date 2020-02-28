import { BaseProvider } from './providers/base';
import { SegmentProvider } from './providers/segment';
import { RunOptions, Providers } from '@blockstack/stats';

const nameToProvider = {
  [Providers.Segment]: SegmentProvider,
};

export const exportToProviders = async (opts: RunOptions) => {
  const providersConfig = opts.providers || [];
  const providers: (typeof BaseProvider | undefined)[] = providersConfig.map(provider => nameToProvider[provider.name]);
  const runs = providers.map(async (provider, index) => await provider?.run(opts, providersConfig[index]));
  await Promise.all(runs);
};
