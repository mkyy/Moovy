import * as React from 'react';
import { Animated, Image, PanResponder, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SBItem } from './SBItem';
import { window } from '../constants';
import axios from 'axios';
import { Movie } from '../@custom-types/movie';
import { Button, IconButton, Text } from 'react-native-paper';
import { Audio } from 'expo-av';
import { Recording, Sound } from 'expo-av/build/Audio';
import { isConnected } from '../utils/InternetInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PAGE_WIDTH = window.width;
// to-do movies data goes here.

function MoviesCarousel() {
  const [progressValue, setProgressValue] = React.useState<number>(0);
  const [recording, setRecording] = React.useState<Recording>();
  const [sound, setSound] = React.useState<Sound>();
  const [uri, setUri] = React.useState<string | null>();
  const [results, setResults] = React.useState<Movie[]>([]);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 1.2,
  } as const;

  const MoovyApi = axios.create({
    baseURL: process.env.REACT_APP_MOOVY_API,
  });

  const onStartRecord = async () => {
    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
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
    const uriDir = recording?.getURI();
    setUri(uriDir);
    console.log('Recording stopped and stored at', uriDir);
  };

  const onStartPlay = async (audioId: number | null) => {
    try {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync({
        uri: `${process.env.REACT_APP_MOOVY_API}audio/${audioId}`,
      });
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();
    } catch (err) {
      console.error('Failed to start playing', err);
    }
  };

  const onStopPlay = async () => {};

  const submitAudio = (movie: Movie) => {
    const audioFile = new FormData();
    // @ts-ignore
    audioFile.append('file', { uri: uri, name: 'audio-record', type: 'audio/m4a' });

    MoovyApi.post(`api/audio/${movie.id}`, audioFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(snapshot => console.log('Arquivo de audio enviado para o servidor.'))
      .catch(err => console.error(err));
  };

  const getData = async () => {};

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponderCapture: () => true,
        onPanResponderStart: () => onStartRecord(),
        // onPanResponderRelease: () => onStopRecord(),
        onPanResponderEnd: () => onStopRecord(),
      }),
    [recording]
  );

  React.useEffect(() => {
    async function getPerms() {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    }
    getPerms();

    isConnected()
      .then(() => {
        MoovyApi.get('api/movies')
          .then(async snapshot => {
            if (snapshot.data.length < 1) {
              await AsyncStorage.removeItem('movies');
              return setResults([]);
            }

            // ============ THERE IS MOVIES ON SERVER DATABASE ============
            const data: Movie[] = snapshot.data;
            const myLibraryJSON = await AsyncStorage.getItem('movies');
            const myLibraryParsed: Movie[] =
              myLibraryJSON != null ? JSON.parse(myLibraryJSON) : null;

            // checking if no movies from storage were deleted from server
            const myLibraryStorage = myLibraryParsed.filter(
              movie => data.find(movieFromDB => movieFromDB.imdbID === movie.imdbID) !== undefined
            );

            const recentlyAddedMovies = data.filter(
              movie =>
                myLibraryStorage.find(storedMovie => storedMovie.imdbID === movie.imdbID) ===
                undefined
            );

            recentlyAddedMovies.forEach(movie =>
              myLibraryStorage.push({ ...movie, localAudioUri: null })
            );
            setResults(myLibraryStorage);

            // saving movies on storage as json
            const jsonValue = JSON.stringify(myLibraryStorage);
            await AsyncStorage.setItem('movies', jsonValue).then(() =>
              console.log('armazenado no storage')
            );
          })
          .catch(err => console.log(err));
      })
      .catch(async () => {
        // case there is no internet connection
        console.log('offline');
        try {
          const jsonValue = await AsyncStorage.getItem('movies');
          const result = jsonValue != null ? JSON.parse(jsonValue) : null;

          if (!result) return setResults([]);

          return setResults(result);
        } catch (e) {
          console.error(e);
        }
      });
  }, []);

  return (
    <>
      {!results.length && (
        <View
          style={{
            width: '100%',
            height: '70%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image source={require('../assets/magnify.png')} />
          <Text style={{ width: '80%' }}>
            It looks like there are no movies in your library! Go to you web application and add
            some!
          </Text>
        </View>
      )}
      {results.length > 0 && (
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
            {!results[progressValue].audioId && (
              <IconButton
                mode='contained'
                containerColor='#6CD3AE'
                icon='microphone-outline'
                {...panResponder.panHandlers}
              ></IconButton>
            )}

            {!!results[progressValue].audioId && (
              <IconButton
                mode='contained'
                containerColor='#6CD3AE'
                icon='play'
                onPress={() => onStartPlay(results[progressValue].audioId)}
              ></IconButton>
            )}
            <Button onPress={() => getData()}>GET DATA</Button>
          </View>
        </View>
      )}
    </>
  );
}

export default MoviesCarousel;
