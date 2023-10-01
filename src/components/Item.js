import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 4,
  },
  title: {
    color: 'white',
  },
});

export const Item = ({item, onPress, onLongPress}) => (
  <Pressable
    onPress={() => onPress(item)}
    onLongPress={() => onLongPress(item)}
    style={({pressed}) => [
      {
        backgroundColor: pressed ? 'blue' : 'black',
      },
      styles.item,
    ]}>
    <Text style={styles.title}>{item.label}</Text>
  </Pressable>
);
