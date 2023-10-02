import React from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

import { launch_app, set_default_launcher } from '../services/launcher';
import { Item } from '../components/Item';
import { addFavListItem } from '../services/storage';

const AppList = ({ list, updateList }) => {
  return (
    <SafeAreaView>
      <Pressable onPress={set_default_launcher} style={styles.item}>
        <Text style={{ fontFamily: 'FiraCode' }}>Set default launcher</Text>
      </Pressable>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <Item
            key={item.packageName}
            item={item}
            onPress={() => {
              launch_app(item.packageName);
            }}
            onLongPress={async () => {
              await addFavListItem(item);
              updateList();
            }}
          />
        )}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 4,
  },
  title: {
    color: 'white',
  },
});

export default AppList;
