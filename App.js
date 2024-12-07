import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import styles from "./style/AppStyle";
import MainScreen from './screens/MainScreen';
import SplashScreenComponent from './components/SplashScreenComponent';

export default function App() {
  return (
    <SplashScreenComponent>
      <SafeAreaView style={styles.container}>
        <MainScreen />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SplashScreenComponent>
  );
}
