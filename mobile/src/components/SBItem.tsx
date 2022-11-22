import React from 'react';
import { SBImageItem } from './SBImageItem';
import Animated, { AnimateProps } from 'react-native-reanimated';
import { StyleProp, ViewStyle } from 'react-native';
import type { ViewProps } from 'react-native';
import { Text } from 'react-native-paper';
import { Movie } from '../@custom-types/movie';

interface Props extends AnimateProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  movie: Movie;
}

export const SBItem: React.FC<Props> = props => {
  const { style, movie, ...animatedViewProps } = props;

  return (
    <Animated.View style={{ flex: 1, overflow: 'hidden', borderRadius: 8 }} {...animatedViewProps}>
      <SBImageItem style={style} imgUrl={movie.Poster} />
      {movie.localAudioUri && !movie.audioId && (
        <Animated.View
          style={{
            backgroundColor: '#E5E5E5',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            paddingTop: 15,
            paddingBottom: 15,
            alignItems: 'center',
          }}
        >
          <Text variant='titleLarge'>pending sync</Text>
        </Animated.View>
      )}
      {movie.localAudioUri && !!movie.audioId && (
        <Animated.View
          style={{
            backgroundColor: '#E5E5E5',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            paddingTop: 15,
            paddingBottom: 15,
            alignItems: 'center',
          }}
        >
          <Text variant='titleLarge'>synced</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
};
