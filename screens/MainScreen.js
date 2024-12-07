import { View, Text, Button } from "react-native";
import styles from "../style/MainStyle";
import LoginScreen from "./LoginScreen";

const Main = () => {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
};

export default Main;