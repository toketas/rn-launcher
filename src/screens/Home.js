import React from 'react';
import {StyleSheet, View} from 'react-native';
import {launch_app} from '../services/launcher';
import {Item} from '../components/Item';
import {removeFavListItem} from '../services/storage';

const config = {
  theme: {
    font_color: 'white',
    bg_color: 'black',
  },
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: config.theme.bg_color,
  },
  hello: {
    color: config.theme.font_color,
  },
  favlist: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

const FavList = ({list, updateList}) => {
  return (
    <View style={styles.favlist}>
      {list.map(item => (
        <Item
          key={item.packageName}
          item={item}
          onPress={() => launch_app(item)}
          onLongPress={async () => {
            await removeFavListItem(item);
            updateList();
          }}
        />
      ))}
    </View>
  );
};

const Home = ({favList, updateList}) => (
  <View style={styles.bg}>
    <View style={{flex: 1}} />
    <FavList list={favList} updateList={updateList} />
  </View>
);

export default Home;
