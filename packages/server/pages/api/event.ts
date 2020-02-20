import { NextApiRequest, NextApiResponse } from 'next';
import { RunOptions } from '@blockstack/analytics';
import { exportToProviders } from '../../lib/utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const runOptions: RunOptions = req.body;
  console.log(runOptions);
  try {
    await exportToProviders(runOptions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
    });
  }

  // SegmentAnalytics()
  res.status(200).json({ success: true });
};
