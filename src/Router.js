import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import AppList from './screens/AppList';
import Home from './screens/Home';

const Tab = createMaterialTopTabNavigator();

const Router = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: '0', display: 'none' },
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="AppList" component={AppList} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default Router;
