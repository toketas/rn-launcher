import React from 'react';
import { View } from 'native-base';

import Item from './Item';
import theme from '../config/theme';

const FavoriteList = ({ list, openItem, removeItem, updateList }) => {
  return (
    <View backgroundColor={theme.bg_color} flex={1}>
      {list.map(item => (
        <Item
          key={item.packageName}
          item={item}
          onPress={openItem}
          onLongPress={() => {
            removeItem(item);
          }}
        />
      ))}
    </View>
  );
};

export default FavoriteList;
