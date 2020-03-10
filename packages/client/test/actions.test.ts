import './setup';
import { event, setConfig, getConfig, getContext } from '../src';

describe('event', () => {
  test('passes the right JSON to the server', async () => {
    fetchMock.once('');
    await event({ name: 'test' });
    const [url, extra] = fetchMock.mock.calls[0];
    expect(url).toEqual('http://localhost:5555/api/event');
    expect(extra).toBeTruthy();
    if (!extra || !extra.body) {
      throw 'Invalid request made.';
    }
    expect(extra.method).toEqual('POST');
    const { id } = getConfig();
    const { context, ...body } = JSON.parse(extra.body.toString());
    expect(context).toBeTruthy();
    expect(body).toEqual({
      eventData: {
        name: 'test',
      },
      action: 'event',
      providers: [],
      id,
    });
  });

  test('uses config', async () => {
    setConfig({
      host: 'https://analytics.example.com',
    });
    fetchMock.once('');
    await event({ name: 'ran_test' });
    const [url] = fetchMock.mock.calls[0];
    expect(url).toEqual('https://analytics.example.com/api/event');
  });
});

test('supports useHash', () => {
  setConfig({
    useHash: true,
  });
  location.hash = 'asdf';
  const context = getContext();
  expect(context.page.hash).toEqual('#asdf');
  expect(context.page.url.endsWith('#asdf')).toEqual(true);
  setConfig({
    useHash: false,
  });
  expect(getContext().page.hash).toBeFalsy();
});
