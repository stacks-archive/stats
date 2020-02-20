import { RunOptions } from './adapters/base';
import { SegmentAdapter } from './adapters/segment';

export const runWithAdapters = async (opts: RunOptions) => {
  await Promise.all([SegmentAdapter.run(opts)]);
};
