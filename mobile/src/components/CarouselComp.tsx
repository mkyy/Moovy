import * as React from 'react';
import { Image, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SBItem } from './SBItem';
import { window } from '../constants';
import axios from 'axios';
import { Movie } from '../@custom-types/movie';
import { Button, Text } from 'react-native-paper';
import { Audio } from 'expo-av';
import { Recording, Sound } from 'expo-av/build/Audio';

const PAGE_WIDTH = window.width;
// to-do movies data goes here.

function MoviesCarousel() {
  const [progressValue, setProgressValue] = React.useState<number>(0);
  const [recording, setRecording] = React.useState<Recording>();
  const [sound, setSound] = React.useState<Sound>();
  const [uri, setUri] = React.useState<string | null>();
  const [results, setResults] = React.useState<Movie[]>([]);

  const onStartRecord = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      console.log(recording);
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const onStopRecord = async () => {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording?.getURI();
    setUri(uri);
    console.log('Recording stopped and stored at', uri);
  };

  const onStartPlay = async () => {
    try {
      if (uri) {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync({ uri: uri });
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
      }
    } catch (err) {
      console.error('Failed to start playing', err);
    }
  };

  const onStopPlay = async () => {};

  const MoovyApi = axios.create({
    baseURL: 'http://192.168.2.6:8080/',
  });

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 1.2,
  } as const;

  React.useEffect(() => {
    MoovyApi.get('api/movies')
      .then(snapshot => {
        if (snapshot.data.length < 1) return setResults([]);

        const data: Movie[] = snapshot.data;
        setResults(data);
      })
      .catch(err => console.log(err));
  }, []);

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
        data={results ?? []}
        renderItem={({ index }) => <SBItem imgUrl={results[index].Poster} />}
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '80%',
          alignSelf: 'center',
        }}
      >
        {/* movies data goes here  */}
        <Text variant='headlineMedium'>{results.length && results[progressValue].Title}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Image style={{ marginRight: 5 }} source={require('../assets/star.png')} />
          <Text>{results.length && results[progressValue].imdbRating}</Text>
        </View>

        <Button onPress={onStartRecord}>start record</Button>
        <Button onPress={onStopRecord}>stop record</Button>
        <Button onPress={onStartPlay}>PLAY</Button>
        <Button onPress={onStopPlay}>STOP</Button>
      </View>
    </View>
  );
}

export default MoviesCarousel;
