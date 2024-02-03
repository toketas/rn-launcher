import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppList from './screens/AppList';
import Home from './screens/Home';
import Settings from './screens/Settings';
import { get_app_list } from './helpers/launcher';
import { areListEqual } from './helpers/utils';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const Main = () => {
  const [localList, setLocalList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    get_app_list().then(apps => {
      const result = JSON.parse(apps);
      const list = result.sort((a, b) =>
        a.label?.toLowerCase().localeCompare(b.label?.toLowerCase()),
      );

      if (!areListEqual(list, localList)) {
        setLocalList(list);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: '0', display: 'none' },
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="AppList">
        {props => (
          <AppList
            {...props}
            list={localList}
            loadApps={fetchData}
            loading={loading}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

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
