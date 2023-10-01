import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFavList = async () => {
  const favList = await AsyncStorage.getItem('favList');
  if (favList !== null) {
    return JSON.parse(favList);
  }
  return [];
};

export const addFavListItem = async item => {
  const currentList = await getFavList();
  if (currentList.find(i => i.label === item.label) !== undefined) {
    console.info(
      'package %s already present on favorites, skipping...',
      item.label,
    );
    return;
  }
  console.log('adding package %s on favorites...', item.label);
  currentList.push({packageName: item.packageName, label: item.label});
  const newList = currentList.sort(el => el.label);
  await AsyncStorage.setItem('favList', JSON.stringify(newList));
  return;
};

export const removeFavListItem = async item => {
  console.info('removing %s from favorites...', item.label);
  const currentList = await getFavList();
  const newList = currentList.filter(el => el.label !== item.label);
  await AsyncStorage.setItem('favList', JSON.stringify(newList));
  return;
};
