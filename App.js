import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {InstalledApps} from 'react-native-launcher-kit';

const result = InstalledApps.getSortedApps();
const filtered = result.map(value => {
  return {
    name: value.packageName,
    ...value,
  };
});

const Item = ({name}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  console.log(filtered);
  return (
    <SafeAreaView>
      <FlatList
        data={filtered}
        renderItem={({item}) => <Item name={item.label} />}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'black',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 4,
  },
  title: {
    color: 'white',
  },
});

export default App;
