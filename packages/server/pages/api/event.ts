import { NextApiRequest, NextApiResponse } from 'next';
// import SegmentAnalytics from 'analytics-node';
import { EventData } from '../../lib/types';
import { Actions } from '../../lib/adapters/base';
import { runWithAdapters } from '../../lib/utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const eventData: EventData = req.body;
  try {
    await runWithAdapters({
      eventData,
      action: Actions.EVENT,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
    });
  }

  // SegmentAnalytics()
  res.status(200).json({ success: true });
};
