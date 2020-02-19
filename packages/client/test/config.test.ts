import { getConfig, setConfig, defaultConfig } from '../src';

test('can get default config', () => {
  const config = getConfig();
  expect(config).toEqual(defaultConfig);
});

test('can set config', () => {
  const newConfig = {
    host: 'asdf',
  };
  setConfig(newConfig);
  const config = getConfig();
  expect(config).toEqual({
    ...defaultConfig,
    host: 'asdf',
  });
});
