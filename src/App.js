import { NativeBaseProvider } from 'native-base';
import React from 'react';

import Router from './Router';

const App = () => (
  <NativeBaseProvider>
    <Router />
  </NativeBaseProvider>
);

export default App;
