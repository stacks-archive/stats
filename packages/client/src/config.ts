import { Provider } from './types';

interface PartialConfig {
  host: string;
  providers: Provider[];
}

interface Config extends PartialConfig {
  id: string;
}

export const defaultConfig: PartialConfig = {
  host: 'http://localhost:5555',
  providers: [],
};

// thanks https://gist.github.com/6174/6062387
const makeID = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
};

const LS_BSK_ID = '__bsk_ana_id__';

const getOrSetAnonymousID = () => {
  const existingID = localStorage.getItem(LS_BSK_ID);
  if (existingID) {
    return existingID;
  }
  const newID = makeID();
  localStorage.setItem(LS_BSK_ID, newID);
  return newID;
};

let config: PartialConfig = {
  ...defaultConfig,
};

export const setConfig = (newConfig: Partial<Config>): void => {
  config = {
    ...config,
    ...newConfig,
  };
};

export const getConfig = (): Config => {
  return {
    ...config,
    id: getOrSetAnonymousID(),
  };
};
