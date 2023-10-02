const { ToastAndroid } = require('react-native');

// Send toast notification here
export const show = (message, ...args) => {
  let newMessage = message;
  args.forEach(item => {
    newMessage = newMessage.replace(/%s/, item);
  });
  ToastAndroid.show(newMessage, ToastAndroid.SHORT);
};
