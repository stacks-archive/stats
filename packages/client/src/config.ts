interface Config {
  host: string;
}

export const defaultConfig = {
  host: 'http://localhost:5555',
};

let config: Config = {
  ...defaultConfig,
};

export const setConfig = (newConfig: Config) => {
  config = {
    ...config,
    ...newConfig,
  };

  return config;
};

export const getConfig = () => config;
