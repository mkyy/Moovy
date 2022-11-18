import React from 'react';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import { SBImageItem } from './SBImageItem';
import { SBTextItem } from './SBTextItem';
import Constants from 'expo-constants';
import Animated, { AnimateProps } from 'react-native-reanimated';
import { StyleProp, Text, ViewStyle } from 'react-native';
import type { ViewProps } from 'react-native';

interface Props extends AnimateProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  imgUrl: string;
}

export const SBItem: React.FC<Props> = props => {
  const { style, imgUrl, ...animatedViewProps } = props;

  return (
    <Animated.View style={{ flex: 1 }} {...animatedViewProps}>
      <SBImageItem style={style} imgUrl={imgUrl} />
    </Animated.View>
  );
};
