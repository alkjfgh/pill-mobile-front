import { View, Text, Button } from "react-native";
import styles from "../style/MainStyle";
import LoginScreen from "./LoginScreen";
import SearchScreen from "./SearchScreen";
import HistoryScreen from "./HistoryScreen";

const Main = () => {
  return (
    <View style={styles.container}>
      <LoginScreen />
      <SearchScreen />
      <HistoryScreen />
    </View>
  );
};

export default Main;