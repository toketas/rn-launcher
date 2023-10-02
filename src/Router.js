import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';

import AppList from './screens/AppList';
import Home from './screens/Home';
import { get_app_list } from './helpers/launcher';
import { getFavList } from './helpers/storage';

const Router = () => {
  const [appList, setAppList] = useState([]);
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    loadApps();
    loadFavList();
  }, []);

  const onIndexChanged = index => {
    if (index === 0) {
      loadFavList();
    }
    if (index === 1) {
      loadApps();
    }
  };

  const loadApps = async () => {
    await setAppList(get_app_list());
  };

  const loadFavList = async () => {
    const list = await getFavList();
    await setFavList(list);
  };

  return (
    <Swiper
      showsPagination={false}
      loop={false}
      onIndexChanged={index => {
        onIndexChanged(index);
      }}>
      <Home favList={favList} updateList={loadFavList} />
      <AppList list={appList} updateList={loadFavList} />
    </Swiper>
  );
};

export default Router;
