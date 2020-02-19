import { getConfig } from './config';

interface EventProperties {
  [key: string]: any;
}

export const event = async (name: string, properties: EventProperties = {}) => {
  const { host } = getConfig();
  await fetch(`${host}/api/event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      properties,
    }),
  });
};
