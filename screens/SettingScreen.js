import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import styles from "../style/SettingStyle";
import useGetGoogleAuth from "../auth/useGetGoogleAuth";

const SettingScreen = ({ navigation }) => {
  const { user } = useGetGoogleAuth();
  const appVersion =
    Constants.manifest?.version ||
    Constants.expoConfig?.version ||
    Constants.manifest2?.extra?.expoClient?.version ||
    "1.0.0";

  const buildNumber =
    Constants.manifest?.ios?.buildNumber ||
    Constants.manifest?.android?.versionCode ||
    Constants.expoConfig?.ios?.buildNumber ||
    Constants.expoConfig?.android?.versionCode ||
    Constants.manifest2?.extra?.expoClient?.ios?.buildNumber ||
    "1";

  return (
    <SafeAreaView style={styles.container}>

      {/* 계정 설정 버튼 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> 내 계정 정보 </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("계정")}
        >
          {user ? (
            <View style={styles.row}>
              <Text style={styles.buttonText}> 계정 </Text>
              <Text style={styles.versionText}>{user.email}</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}> 계정 </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* 앱 버전 설정 버튼 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> 앱 정보 </Text>
        <TouchableOpacity style={styles.button}>
          <View style={styles.row}>
            <Text style={styles.appText}>앱 정보</Text>
            <Text style={styles.versionText}>
              {appVersion} (Build {buildNumber})
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;