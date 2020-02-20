import { NextApiRequest, NextApiResponse } from 'next';
import { RunOptions } from '../../lib/types';
import { runWithAdapters } from '../../lib/utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const runOptions: RunOptions = req.body;
  console.log(runOptions);
  try {
    await runWithAdapters(runOptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
    });
  }

  // SegmentAnalytics()
  res.status(200).json({ success: true });
};
