import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MoviesCarousel from './components/CarouselComp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function MobileMoovy() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='My Library' component={MoviesCarousel} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style='auto' />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
