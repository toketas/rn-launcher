import React from 'react';

import 'react-native-gesture-handler';

import Router from './Router';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

const App = () => (
  <GluestackUIProvider config={config}>
    <Router />
  </GluestackUIProvider>
);

export default App;
