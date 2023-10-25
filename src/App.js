import React from 'react';
import { NativeBaseProvider } from 'native-base';

import 'react-native-gesture-handler';

import Router from './Router';

const App = () => (
  <NativeBaseProvider>
    <Router />
  </NativeBaseProvider>
);

export default App;
