import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './app/navigation';
import {useFonts} from "expo-font"
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    "Jakarta-Regular": require("./assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-Medium": require("./assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-SemiBold": require("./assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "Jakarta-Bold": require("./assets/fonts/PlusJakartaSans-Bold.ttf")
  });

  useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}