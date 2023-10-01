import {InstalledApps, RNLauncherKitHelper} from 'react-native-launcher-kit';

export const launch_app = async packageName => {
  await RNLauncherKitHelper.launchApplication(packageName);
};

export const set_default_launcher = async () => {
  await RNLauncherKitHelper.openSetDefaultLauncher();
};

export const get_app_list = () => {
  return InstalledApps.getSortedApps();
};
