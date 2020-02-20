import { getConfig } from './config';
import { EventData } from '../../server/lib/types';

export const event = async (eventData: EventData) => {
  const { host } = getConfig();
  await fetch(`${host}/api/event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...eventData,
    }),
  });
};
