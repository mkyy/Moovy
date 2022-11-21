import NetInfo from '@react-native-community/netinfo';

export function isConnected() {
  return new Promise((resolve, reject) => {
    NetInfo.fetch().then(state => {
      console.log('Is connected?', state.isConnected);

      if (state.isConnected) {
        resolve(true);
      } else {
        reject();
      }
    });
  });
}
