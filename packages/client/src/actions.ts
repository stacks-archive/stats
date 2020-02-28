import { getConfig } from './config';
import {
  EventData,
  Actions,
  Context,
  EventRun,
  PageRun,
  PageData,
} from './types';

export const getContext = (): Context => {
  const { location } = document;
  return {
    page: {
      path: location.pathname,
      origin: location.origin,
      url: `${location.origin}/${location.pathname}`,
    },
  };
};

export const event = async (eventData: EventData) => {
  const { host, providers, id } = getConfig();
  const body: EventRun = {
    action: Actions.EVENT,
    context: getContext(),
    eventData: {
      ...eventData,
    },
    providers,
    id,
  };
  try {
    await fetch(`${host}/api/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error('Error when sending to Stats', error);
  }
};

export const page = async (pageData: PageData) => {
  const { host, providers, id } = getConfig();
  const context = getContext();
  const body: PageRun = {
    action: Actions.PAGE,
    context,
    pageData: {
      ...pageData,
      ...context.page,
    },
    providers,
    id,
  };
  try {
    await fetch(`${host}/api/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error('Error when sending to Stats', error);
  }
};
