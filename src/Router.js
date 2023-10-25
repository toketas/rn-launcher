import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppList from './screens/AppList';
import Home from './screens/Home';
import Settings from './screens/Settings';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const Main = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: { height: '0', display: 'none' },
    }}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="AppList" component={AppList} />
  </Tab.Navigator>
);

const Router = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: 0,
        },
      }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Router;
