import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import theme from '../config/theme';
import { Item } from '../components/Item';
import { launch_app } from '../helpers/launcher';
import { removeFavListItem } from '../helpers/storage';

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: theme.bg_color,
  },
  favlist: {
    flex: 1,
    backgroundColor: theme.bg_color,
  },
});

const HintMessage = () => (
  <View style={{ flex: 1, padding: 20 }}>
    <Text style={{ fontFamily: theme.font_family, color: theme.font_color }}>
      First time here bud? Swipe left to list your apps.
    </Text>
    <Text />
    <Text style={{ fontFamily: theme.font_family, color: theme.font_color }}>
      Long press to add them here.
    </Text>
  </View>
);

const FavList = ({ list, updateList }) => {
  return (
    <View style={styles.favlist}>
      {list.map(item => (
        <Item
          key={item.packageName}
          item={item}
          onPress={() => launch_app(item.packageName)}
          onLongPress={async () => {
            await removeFavListItem(item);
            updateList();
          }}
        />
      ))}
    </View>
  );
};

const Home = ({ favList, updateList }) => (
  <View style={styles.bg}>
    <View style={{ flex: 1 }} />
    {favList.length ? (
      <FavList list={favList} updateList={updateList} />
    ) : (
      <HintMessage />
    )}
  </View>
);

export default Home;
