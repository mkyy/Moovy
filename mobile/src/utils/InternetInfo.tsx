import NetInfo from '@react-native-community/netinfo';

export function isConnected() {
  return new Promise((resolve, reject) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        resolve(true);
      } else {
        reject();
      }
    });
  });
}
