import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { debounce } from 'lodash';
import { SearchIcon, ThreeDotsIcon } from 'native-base';

import { launch_app, set_default_launcher } from '../helpers/launcher';
import { Item } from '../components/Item';
import { addFavListItem } from '../helpers/storage';
import theme from '../config/theme';
import { normalize_str } from '../helpers/normalizer';

const AppList = ({ list, updateList }) => {
  const [localList, setLocalList] = useState(list);
  const [search, setSearch] = useState('');

  const onSearch = value => {
    setSearch(value);

    //console.log('list', list.length);
    // lazy way to search for substring
    const newList = list.filter(
      item =>
        normalize_str(item.label.toUpperCase()).indexOf(
          normalize_str(value.toUpperCase()),
        ) !== -1,
    );

    setLocalList(newList);
  };

  const onSearchDebouncer = useCallback(debounce(onSearch, 300), []);

  return (
    <SafeAreaView flex={1} backgroundColor={theme.bg_color}>
      <View backgroundColor={theme.actions_bg_color} flexDirection="row">
        <View style={styles.action_search}>
          <SearchIcon />
        </View>
        <TextInput
          flex={1}
          style={styles.action_item}
          placeholder="Search"
          placeholderTextColor={theme.actions_font_color}
          onChangeText={onSearchDebouncer}
        />
        <Pressable onPress={set_default_launcher} style={styles.action_search}>
          <ThreeDotsIcon />
        </Pressable>
      </View>
      <FlatList
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        data={search.length > 0 ? localList : list}
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
  action_item: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    color: theme.font_color,
    fontFamily: theme.font_family,
  },
  action_search: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  item: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  list: {
    backgroundColor: theme.bg_color,
  },
});

export default AppList;
