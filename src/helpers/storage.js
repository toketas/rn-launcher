import AsyncStorage from '@react-native-async-storage/async-storage';
import { show } from './toast';

export const getFavList = async () => {
  const favList = await AsyncStorage.getItem('favList');
  if (favList !== null) {
    return JSON.parse(favList);
  }
  return [];
};

export const getRecentApps = async () => {
  const list = await AsyncStorage.getItem('recentApps');
  if (list !== null) {
    return JSON.parse(list);
  }
  return [];
};

export const addRecentList = async item => {
  const current = await getRecentApps();
  if (current.find(el => el.packageName === item.packageName) !== undefined) {
    current.push({ packageName: item.packageName, label: item.label });
    current.shift();
    await AsyncStorage.setItem('recentApps', JSON.stringify(current));
  }
  return;
};

export const addFavListItem = async item => {
  const currentList = await getFavList();
  if (currentList.find(i => i.label === item.label) !== undefined) {
    console.info(
      'package %s already present on favorites, skipping...',
      item.label,
    );
    show('%s already present on favorites!', item.label);
    return;
  }
  console.info('adding package %s on favorites...', item.label);
  currentList.push({ packageName: item.packageName, label: item.label });
  const newList = currentList.sort(el => el.label);
  await AsyncStorage.setItem('favList', JSON.stringify(newList));
  show('Added %s to favorites!', item.label);
  return;
};

export const removeFavListItem = async item => {
  console.info('removing %s from favorites...', item.label);
  const currentList = await getFavList();
  const newList = currentList.filter(el => el.label !== item.label);
  await AsyncStorage.setItem('favList', JSON.stringify(newList));
  show('Removed %s from favorites', item.label);
  return;
};
