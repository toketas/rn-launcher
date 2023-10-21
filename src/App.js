import React from 'react';
import { NativeBaseProvider } from 'native-base';

import Router from './Router';

const App = () => (
  <NativeBaseProvider>
    <Router />
  </NativeBaseProvider>
);

export default App;
