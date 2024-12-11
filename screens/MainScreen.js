import { View, Text, Button, SafeAreaView } from "react-native";
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import styles from "../style/MainStyle";
import LoginScreen from "./LoginScreen";
import SearchScreen from "./SearchScreen";
import HistoryScreen from "./HistoryScreen";
import MyCustomDrawer from "../components/MyCustomDrawer";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    // <SafeAreaProvider>
      <View style={styles.container}>
        <Text>Main</Text>
      </View>
  );
};

export default Main;