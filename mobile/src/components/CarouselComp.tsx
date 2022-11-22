import * as React from 'react';
import NetInfo, { NetInfoSubscription } from '@react-native-community/netinfo';
import { Animated, Image, PanResponder, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SBItem } from './SBItem';
import { window } from '../constants';
import axios from 'axios';
import { Movie } from '../@custom-types/movie';
import { Button, Dialog, IconButton, Paragraph, Text } from 'react-native-paper';
import { Audio } from 'expo-av';
import { Recording, Sound } from 'expo-av/build/Audio';
import { isConnected } from '../utils/InternetInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { millisecondsToTime } from '../utils/MilliToTime';

const PAGE_WIDTH = window.width;
// to-do movies data goes here.

function MoviesCarousel() {
  // carousel
  const [progressValue, setProgressValue] = React.useState<number>(0);

  // audio handlers
  const [recording, setRecording] = React.useState<Recording>();
  const [recStatus, setRecStatus] = React.useState<string | number>();
  const [sound, setSound] = React.useState<Sound>();
  const [uri, setUri] = React.useState<string | null>();

  // movies data
  const [results, setResults] = React.useState<Movie[]>([]);

  // utils
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [unsubscribe, setUnsubscribe] = React.useState<NetInfoSubscription | null>(null);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 1.2,
  } as const;

  const MoovyApi = axios.create({
    baseURL: process.env.REACT_APP_MOOVY_API,
  });

  const hideDialog = () => setIsDialogVisible(false);

  const onStartRecord = async () => {
    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        newStatus => {
          let recordingTime = millisecondsToTime(newStatus.durationMillis);
          setRecStatus(recordingTime);
        }
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
    if (uriDir && FileSystem.documentDirectory) {
      FileSystem.moveAsync({
        from: uriDir,
        to: FileSystem.documentDirectory + `audio-${results[progressValue].id}.m4a`,
      }).then(async snapshot => {
        let resultsUpdated = results.map(movie => {
          if (movie.id !== results[progressValue].id) return movie;

          return {
            ...movie,
            localAudioUri: FileSystem.documentDirectory + `audio-${results[progressValue].id}.m4a`,
          };
        });
        setResults(resultsUpdated);
        await AsyncStorage.setItem('movies', JSON.stringify(resultsUpdated));
      });
    }
  };

  const onStartPlay = async () => {
    try {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync({
        uri: FileSystem.documentDirectory + `audio-${results[progressValue].id}.m4a`,
      });
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();
    } catch (err) {
      console.error('Failed to start playing', err);
    }
  };

  const deleteAudio = async () => {
    return await MoovyApi.delete(
      `api/audio/${results[progressValue].id}/${results[progressValue].audioId}`
    )
      .then(() => {
        FileSystem.deleteAsync(
          FileSystem.documentDirectory + `audio-${results[progressValue].id}.m4a`
        ).then(async () => {
          let resultsUpdated = results.map(movie => {
            if (movie.id !== results[progressValue].id) return movie;

            return {
              ...movie,
              localAudioUri: null,
              audioId: null,
            };
          });
          setResults(resultsUpdated);
          await AsyncStorage.setItem('movies', JSON.stringify(resultsUpdated));
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const submitAudio = (movie: Movie) => {
    const audioFile = new FormData();
    audioFile.append('file', {
      // @ts-ignore
      uri: movie.localAudioUri,
      name: `audio-${movie.imdbID}`,
      type: 'audio/m4a',
    });

    MoovyApi.post(`api/audio/${movie.id}`, audioFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(snapshot => {
        let audioIdRegistered = snapshot.data.id;
        let newResults = results.map(result => {
          if (result.imdbID !== movie.imdbID) return result;

          return { ...result, audioId: audioIdRegistered };
        });
        setResults(newResults);
      })
      .catch(err => console.error(err));
  };

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponderCapture: () => true,
        onPanResponderStart: () => onStartRecord(),
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
            const myLibraryParsed: Movie[] = myLibraryJSON != null ? JSON.parse(myLibraryJSON) : [];

            // checking if no movies from storage were deleted from server
            const myLibraryStorage: Movie[] = myLibraryParsed.filter(
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
            await AsyncStorage.setItem('movies', jsonValue);
          })
          .catch(err => console.error('falha ao carregar filmes do servidor', err));
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

  React.useEffect(() => {
    let checkPassed = results.find(movie => movie.localAudioUri && !movie.audioId);
    if (checkPassed === undefined) {
      if (unsubscribe) unsubscribe();
      return;
    }

    const unsub = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        results.forEach(movie => {
          if (movie.localAudioUri && !movie.audioId) {
            submitAudio(movie);
          }
        });
      } else {
        console.warn('Connect internet to sync your audios. Sync failed.');
      }
    });
    setUnsubscribe(unsub);
  }, [results]);

  return (
    <>
      {results.length < 1 ? (
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
      ) : null}
      {results.length > 0 ? (
        <View
          style={{
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Carousel
            loop
            {...baseOptions}
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
            renderItem={({ index }) => <SBItem movie={results[index]} />}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '80%',
              alignSelf: 'center',
              position: 'relative',
            }}
          >
            {/* movies data goes here  */}
            <Text variant='headlineLarge'>{results.length && results[progressValue].Title}</Text>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <Image style={{ marginRight: 5 }} source={require('../assets/star.png')} />
              <Text>{results.length && results[progressValue].imdbRating}</Text>
            </View>
            {/* record audio button */}
            {!results[progressValue].localAudioUri && (
              <IconButton
                mode='contained'
                containerColor='#6CD3AE'
                icon='microphone-outline'
                size={40}
                style={{ zIndex: 5 }}
                {...panResponder.panHandlers}
              ></IconButton>
            )}
            {/* play audio button */}
            {!!results[progressValue].localAudioUri && (
              <IconButton
                mode='contained'
                containerColor='#A1A1A1'
                icon='play'
                size={40}
                onPress={() => onStartPlay()}
              ></IconButton>
            )}
            {!!recording && (
              <Animated.View
                style={{
                  backgroundColor: '#12153D',
                  opacity: 0.9,
                  borderRadius: 40,
                  width: '100%',
                  height: 223,
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: 0,
                  padding: 15,
                }}
              >
                <Text variant='headlineSmall' style={{ color: '#fff', marginBottom: 10 }}>
                  Keep Holding to Record
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      backgroundColor: '#FE0000',
                      width: 20,
                      height: 20,
                      borderRadius: 50,
                      marginRight: 5,
                    }}
                  ></View>
                  <Text variant='titleLarge' style={{ color: '#fff' }}>
                    {recStatus}
                  </Text>
                </View>
              </Animated.View>
            )}
          </View>
          {results[progressValue].localAudioUri && (
            <IconButton
              mode='contained'
              containerColor='#FE6D8E'
              icon='delete-outline'
              onPress={() => setIsDialogVisible(true)}
              style={{ position: 'absolute', left: 0, bottom: 0 }}
            ></IconButton>
          )}
        </View>
      ) : null}

      {/* dialog alert */}
      <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
        <Dialog.Title>Delete Audio</Dialog.Title>
        <Dialog.Content>
          <Text>Are you sure you want to delete ”{results[progressValue]?.Title}” review?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog()}>Cancel</Button>
          <Button
            textColor='#fff'
            buttonColor='#FE6D8E'
            onPress={() => {
              try {
                deleteAudio();
              } catch (err) {
                alert(
                  'erro ao deletar seu audio, verifique sua conexão com a internet e tente novamente.'
                );
              }
              hideDialog();
            }}
          >
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}

export default MoviesCarousel;
