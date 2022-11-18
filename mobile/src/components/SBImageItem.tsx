import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  Image,
  ImageURISource,
  Text,
} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  imgUrl?: string;
}

export const SBImageItem: React.FC<Props> = ({ style, imgUrl }) => {
  const source = React.useRef<ImageURISource>({
    uri: imgUrl,
  }).current;

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size='small' />
      <Image key={imgUrl} style={styles.image} source={source} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
