import React from 'react';
import { Button, Flex } from '@blockstack/ui';
import { event } from '@blockstack/stats';

const App: React.FC = () => {
  return (
    <Flex align="center" justify="center" width="100vw" minHeight="100vh" className="App" direction="column">
      <Button onClick={() => event({ name: 'testing' })}>Hello</Button>
    </Flex>
  );
};

export default App;
