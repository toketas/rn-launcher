import React, { useEffect, useState } from 'react';
import { AppState, Text } from 'react-native';
import { View } from 'native-base';

import FavoriteList from '../components/FavoriteList';
import theme from '../config/theme';
import { launch_app } from '../helpers/launcher';
import { getFavList, removeFavListItem } from '../helpers/storage';

const HintMessage = () => (
  <View flex={1} padding={20}>
    <Text style={{ fontFamily: theme.font_family, color: theme.font_color }}>
      First time here bud? Swipe left to list your apps.
    </Text>
    <Text />
    <Text style={{ fontFamily: theme.font_family, color: theme.font_color }}>
      Long press to add them here.
    </Text>
  </View>
);

const Home = ({ navigation }) => {
  const [favList, setFavList] = useState([]);

  const updateList = async () => {
    const list = await getFavList();
    setFavList(list);
  };

  const removeItem = async item => {
    await removeFavListItem(item);
    updateList();
  };

  const openItem = item => launch_app(item.packageName);

  useEffect(() => {
    updateList();
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', async state => {
      if (state !== 'active') {
        navigation.navigate('Home');
      }
    });

    const unsubscribe = navigation.addListener('focus', () => {
      updateList();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View backgroundColor={theme.bg_color} flex={1}>
      <View flex={1} />
      {favList.length ? (
        <FavoriteList
          list={favList}
          removeItem={removeItem}
          openItem={openItem}
          updateList={updateList}
        />
      ) : (
        <HintMessage />
      )}
    </View>
  );
};

export default Home;
