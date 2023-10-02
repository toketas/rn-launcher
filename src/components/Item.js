import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import theme from '../config/theme';

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 4,
  },
  title: {
    color: theme.font_color,
    fontFamily: theme.font_family,
  },
});

export const Item = ({ item, onPress, onLongPress }) => (
  <Pressable
    onPress={() => onPress(item)}
    onLongPress={() => onLongPress(item)}
    style={({ pressed }) => [
      {
        backgroundColor: pressed ? 'white' : theme.bg_color,
      },
      styles.item,
    ]}>
    {({ pressed }) => (
      <Text
        style={{
          color: pressed ? 'black' : theme.font_color,
          fontFamily: theme.font_family,
        }}>
        {item.label}
      </Text>
    )}
  </Pressable>
);
