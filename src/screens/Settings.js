import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Pressable, Text, View } from '@gluestack-ui/themed';

import theme from '../config/theme';
import { open_settings, set_default_launcher } from '../helpers/launcher';
import { __VERSION__, LINKTREE } from '../helpers/constants.js';

const styles = StyleSheet.create({
  item: {
    padding: 13,
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
    <Text color={theme.font_color} fontFamily={theme.font_family} fontSize={13}>
      {title}
    </Text>
  </Pressable>
);

const Author = () => (
  <View
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    style={styles.item}>
    <Text color={theme.font_color} fontFamily={theme.font_family} fontSize={10}>
      Made by{' '}
      <Text
        onPress={() => {
          Linking.openURL(LINKTREE);
        }}
        color={theme.font_color}
        fontFamily={theme.font_family}
        fontSize={10}
        underline>
        toketas
      </Text>
    </Text>
    <Text fontSize={12}>v{__VERSION__.replaceAll('"', '')}</Text>
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
