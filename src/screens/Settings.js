import { Pressable, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Item from '../components/Item';
import theme from '../config/theme';
import { open_settings, set_default_launcher } from '../helpers/launcher';

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 0,
    marginHorizontal: 0,
  },
});

const SettingsButton = ({ title, onPress }) => (
  <Pressable
    onPress={() => {
      onPress();
    }}
    style={styles.item}>
    <Text color={theme.font_color} fontFamily={theme.font_family}>
      {title}
    </Text>
  </Pressable>
);

const Author = () => (
  <View style={styles.item}>
    <Text color={theme.font_color} fontFamily={theme.font_family} fontSize={10}>
      Made by toketas
    </Text>
  </View>
);

const Settings = () => {
  return (
    <View flex={1} backgroundColor={theme.actions_bg_color}>
      <SettingsButton
        onPress={set_default_launcher}
        title="Set default launcher"
      />
      <SettingsButton onPress={open_settings} title="Open Phone Settings" />
      <View flex={1} />
      <Author />
    </View>
  );
};

export default Settings;
