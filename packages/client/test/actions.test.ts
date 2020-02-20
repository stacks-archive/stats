import './setup';
import { event, setConfig } from '../src';

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
    const body = JSON.parse(extra.body.toString());
    expect(body).toEqual({
      name: 'test',
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
