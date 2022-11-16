import * as React from 'react';
import { Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import SButton from './SButton';
import { SBItem } from './SBItem';
import { ElementsText, window } from '../constants';

const PAGE_WIDTH = window.width;
// to-do movies data goes here.
const colors = ['#26292E', '#899F9C', '#B3C680', '#5C6265', '#F5D399', '#F1F1F1'];

function MoviesCarousel() {
  const [progressValue, setProgressValue] = React.useState<number>(0);
  const [recording, setRecording] = React.useState<boolean>(false);

  // async function startRecording() {
  //   try{
  //     const permission = await Audio.requestPermissionsAsync();
  //   }
  // }

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 0.6,
  } as const;

  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled={true}
        snapEnabled={true}
        autoPlay={false}
        autoPlayInterval={1500}
        onScrollEnd={idx => setProgressValue(idx)}
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={colors}
        renderItem={({ index }) => <SBItem index={index} pretty={true} />}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 100,
          alignSelf: 'center',
        }}
      >
        {/* movies data goes here  */}
        <Text>{colors[progressValue]}</Text>
        <SButton></SButton>
      </View>
    </View>
  );
}

export default MoviesCarousel;
