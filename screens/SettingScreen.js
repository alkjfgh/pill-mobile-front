import { View, Text, Button, SafeAreaView, TouchableOpacity } from "react-native";
import styles from "../style/SettingStyle";

const SettingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

      {/* 계정 설정 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("계정")}
      >
        <Text style={styles.buttonText}>계정</Text>
      </TouchableOpacity>

      {/* 테마 설정 버튼 */}
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ThemeSettings")}
      >
        <Text style={styles.buttonText}>테마</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default SettingScreen;