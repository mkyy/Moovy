import type { ScaledSize } from 'react-native';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';

export const ElementsText = {
  AUTOPLAY: 'AutoPlay',
};

export const window: ScaledSize =
  Platform.OS === 'web'
    ? {
        ...Dimensions.get('window'),
        width: 375,
      }
    : Dimensions.get('window');
