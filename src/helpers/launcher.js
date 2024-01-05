import { NativeModules } from 'react-native';

const { LauncherModule } = NativeModules;

export const launch_app = async packageName => {
  await LauncherModule.launchApplication(packageName);
};

export const set_default_launcher = async () => {
  await LauncherModule.openSetDefaultLauncher();
};

export const get_app_list = () => {
  return LauncherModule.getApps();
};

export const open_settings = async () => {
  await LauncherModule.openSettings();
};
