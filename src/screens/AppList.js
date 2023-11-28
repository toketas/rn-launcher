import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { debounce } from 'lodash';
import {
  Icon,
  SearchIcon,
  SettingsIcon,
  Text,
  View,
} from '@gluestack-ui/themed';

import Item from '../components/Item';
import theme from '../config/theme';
import { addFavListItem } from '../helpers/storage';
import { get_app_list, launch_app } from '../helpers/launcher';
import { normalize_str } from '../helpers/normalizer';

const AppList = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
      // The screen is focused
      const list = get_app_list();
      setSearch('');
      setLocalList(list);
      setFilteredList(list);
      setLoading(false);

      // Open search form on every swipe
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
    // TODO: fuzzy search
    // lazy way to search for substring
    const newList = localList.filter(
      item =>
        normalize_str(item.label.toUpperCase()).indexOf(
          normalize_str(value.trim().toUpperCase()),
        ) !== -1,
    );

    setFilteredList(newList);
  };

  const onSearchDebouncer = value => {
    // Wait 300ms before actual search
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
        <View
          justifyContent="center"
          paddingVertical={10}
          paddingHorizontal={10}>
          <Icon as={SearchIcon} />
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
          <Icon as={SettingsIcon} color={theme.font_color} />
        </Pressable>
      </View>
      {loading ? (
        <View style={styles.item} flex={1} justifyContent="center">
          <Text
            color={theme.font_color}
            fontFamily={theme.font_family}
            fontSize={13}>
            Loading apps...
          </Text>
        </View>
      ) : (
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
          keyExtractor={(item, index) => index.toString()}
        />
      )}
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
