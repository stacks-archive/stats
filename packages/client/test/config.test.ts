import { getConfig, setConfig, defaultConfig } from '../src';

test('can get default config', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...config } = getConfig();
  expect(config).toEqual(defaultConfig);
});

test('can set config', () => {
  const newConfig = {
    host: 'asdf',
  };
  setConfig(newConfig);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...config } = getConfig();
  expect(config).toEqual({
    ...defaultConfig,
    host: 'asdf',
  });
});
