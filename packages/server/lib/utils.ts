import { BaseAdapter } from './adapters/base';
import { SegmentAdapter } from './adapters/segment';
import { RunOptions, Providers } from './types';

const nameToAdapter = {
  [Providers.Segment]: SegmentAdapter,
};

export const runWithAdapters = async (opts: RunOptions) => {
  const adapters: (typeof BaseAdapter | undefined)[] = opts.providers.map(provider => nameToAdapter[provider.name]);
  const runs = adapters.map(async adapter => await adapter?.run(opts));
  await Promise.all(runs);
};
