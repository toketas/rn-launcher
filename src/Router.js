import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';

import AppList from './screens/AppList';
import Home from './screens/Home';
import { get_app_list } from './helpers/launcher';
import { getFavList } from './helpers/storage';

const Router = () => {
  const [index, setIndex] = useState(0);
  const [appList, setAppList] = useState([]);
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    setIndex(0);
    loadFavList();
    loadApps();
  }, []);

  const onIndexChanged = i => {
    if (i === 0) {
      loadFavList();
    }
    if (i === 1) {
      loadApps();
    }
    setIndex(i);
  };

  const loadApps = async () => {
    const list = await get_app_list();
    //console.log('listaa', list.length);
    await setAppList(list);
  };

  const loadFavList = async () => {
    const list = await getFavList();
    await setFavList(list);
  };

  return (
    <Swiper
      showsPagination={false}
      loop={false}
      index={index}
      onIndexChanged={i => {
        onIndexChanged(i);
      }}>
      <Home favList={favList} updateList={loadFavList} />
      <AppList key={appList} list={appList} updateList={loadFavList} />
    </Swiper>
  );
};

export default Router;
