import { View, Text, Button } from "react-native";
import styles from "../style/MainStyle";
import LoginScreen from "./LoginScreen";
import SearchScreen from "./SearchScreen";

const Main = () => {
  return (
    <View style={styles.container}>
      <LoginScreen />
      <SearchScreen />
    </View>
  );
};

export default Main;