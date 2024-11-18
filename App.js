import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import styles from "./style/AppStyle";
import MainScreen from './screens/MainScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MainScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
