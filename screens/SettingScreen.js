import { View, Text, Button, SafeAreaView, TouchableOpacity, DevSettings, Alert } from "react-native";
import styles from "../style/SettingStyle";
import useGetGoogleAuth from "../auth/useGetGoogleAuth";

const SettingScreen = ({ navigation }) => {
  const { user, handleDeleteAccount } = useGetGoogleAuth();
  
  const confirmDelete = () => {
    Alert.alert(
      "회원 탈퇴",
      "정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "탈퇴",
          onPress: async () => {
            await handleDeleteAccount();
            DevSettings.reload();  // 앱 재시작
            console.log("탈퇴 : 앱 재시작");
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* 계정 설정 버튼 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> 내 계정 정보 </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("계정")}
      >
        <Text style={styles.buttonText}> 계정 </Text>
      </TouchableOpacity>
      </View>

      {/* 앱 버전 설정 버튼 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> 앱 정보 </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("App verion")}
      >
        <Text style={styles.buttonText}> 앱 버전 0.5.1 </Text>
      </TouchableOpacity>
      </View>

       {/* 테마 기능 설정 버튼 */}
       <View style={styles.section}>
        <Text style={styles.sectionTitle}> 테마 </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ThemeSettings")}
      >
        <Text style={styles.buttonText}> 테마 설정 </Text>
      </TouchableOpacity>
      </View>

      {/* 테마 설정 버튼 */}
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ThemeSettings")}
      >
        <Text style={styles.buttonText}>테마</Text>
      </TouchableOpacity> */}

      {/* 로그인한 사용자일 경우에만 탈퇴하기 버튼 표시 */}
      {user && (
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={confirmDelete}
        >
          <Text style={[styles.buttonText, styles.deleteButtonText]}>탈퇴하기</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default SettingScreen;