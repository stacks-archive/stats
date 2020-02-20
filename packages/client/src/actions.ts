import { getConfig } from './config';
import { EventData, RunOptions, Actions } from './types';

export const event = async (eventData: EventData) => {
  const { host, providers, id } = getConfig();
  const body: RunOptions = {
    action: Actions.EVENT,
    eventData,
    providers,
    id,
  };
  await fetch(`${host}/api/event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
