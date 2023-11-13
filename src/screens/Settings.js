import { Pressable, Text, View } from 'native-base';
import React from 'react';
import { Linking, StyleSheet } from 'react-native';
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
      Made by{' '}
      <Text
        onPress={() => {
          Linking.openURL('https://linktr.ee/toketas');
        }}
        color={theme.font_color}
        fontFamily={theme.font_family}
        fontSize={10}
        underline>
        toketas
      </Text>
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
