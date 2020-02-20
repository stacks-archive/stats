import express, { Request, Response } from 'express';
import { RunOptions } from '@blockstack/analytics';
import bodyParser from 'body-parser';
import { exportToProviders } from './utils';

const app = express();
app.use(bodyParser.json());

app.get('/api/event', async (req: Request, res: Response) => {
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
  return res.status(200).json({ success: true });
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5555;

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Listening on http://localhost:${port}`);
});
