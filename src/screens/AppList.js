import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { debounce } from 'lodash';
import { SearchIcon, ThreeDotsIcon, View } from 'native-base';

import Item from '../components/Item';
import theme from '../config/theme';
import { addFavListItem } from '../helpers/storage';
import {
  get_app_list,
  launch_app,
  set_default_launcher,
} from '../helpers/launcher';
import { normalize_str } from '../helpers/normalizer';

const AppList = ({ navigation }) => {
  const [localList, setLocalList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // TODO: fazer funcionar o unfocus, limpar search
    navigation.addListener('tabPress', () => {
      setSearch('');
    });
  }, [navigation]);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      // The screen is focused
      const list = get_app_list();
      setSearch('');
      setLocalList(list);
      setFilteredList(list);
      if (inputRef.current) {
        setTimeout(() => {
          inputRef.current.focus();
        }, 300);
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return focus;
  }, [navigation, inputRef]);

  const onSearch = value => {
    // lazy way to search for substring
    const newList = localList.filter(
      item =>
        normalize_str(item.label.toUpperCase()).indexOf(
          normalize_str(value.toUpperCase()),
        ) !== -1,
    );

    setFilteredList(newList);
  };

  const onSearchDebouncer = value => {
    setSearch(value);
    const debounced = debounce(() => onSearch(value), 300);
    debounced();
  };

  const openSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <SafeAreaView flex={1} backgroundColor={theme.bg_color}>
      <View backgroundColor={theme.actions_bg_color} flexDirection="row">
        <View paddingY={5} paddingX={4}>
          <SearchIcon />
        </View>
        <TextInput
          ref={inputRef}
          autoFocus={true}
          flex={1}
          style={styles.action_item}
          placeholder="Search"
          placeholderTextColor={theme.actions_font_color}
          onChangeText={onSearchDebouncer}
          value={search}
        />
        <Pressable onPress={openSettings} style={styles.action_search}>
          <ThreeDotsIcon />
        </Pressable>
      </View>
      <FlatList
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        data={search.length > 0 ? filteredList : localList}
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
