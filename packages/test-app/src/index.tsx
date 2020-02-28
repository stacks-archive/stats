import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, theme, CSSReset } from '@blockstack/ui';
import { setConfig, Providers } from '@blockstack/stats';

setConfig({
  providers: [
    {
      name: Providers.Segment,
      writeKey: process.env.REACT_APP_SEGMENT_WRITE_KEY || '',
    },
  ],
});

console.log('Segment key configured as:', process.env.REACT_APP_SEGMENT_WRITE_KEY);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CSSReset />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
