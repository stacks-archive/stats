import { Provider } from '../../server/lib/types';

interface Config {
  host: string;
  providers: Provider[];
}

export const defaultConfig: Config = {
  host: 'http://localhost:5555',
  providers: [],
};

let config: Config = {
  ...defaultConfig,
};

export const setConfig = (newConfig: Partial<Config>) => {
  config = {
    ...config,
    ...newConfig,
  };

  return config;
};

export const getConfig = () => config;
