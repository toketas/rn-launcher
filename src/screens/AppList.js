import React from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { launch_app, set_default_launcher } from '../helpers/launcher';
import { Item } from '../components/Item';
import { addFavListItem } from '../helpers/storage';
import theme from '../config/theme';

const AppList = ({ list, updateList }) => {
  return (
    <SafeAreaView>
      <Pressable onPress={set_default_launcher} style={styles.item}>
        <Text style={{ fontFamily: theme.font_family }}>
          Set default launcher
        </Text>
      </Pressable>
      <FlatList
        data={list}
        style={styles.list}
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
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 2,
  },
  list: {
    backgroundColor: theme.bg_color,
  },
});

export default AppList;
