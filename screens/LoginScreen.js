import { View, Text, Button, Image, Alert } from "react-native";
import styles from "../style/LoginStyle";
import useGetGoogleAuth from "../auth/useGetGoogleAuth";
import GoogleLoginButton from "../components/GoogleLoginButton";

const LoginScreen = () => {
  const { user, promptAsync, handleLogout, request, handleDeleteAccount } = useGetGoogleAuth();

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
            console.log("앱 재시작");
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.loggedInContainer}>
          <Image source={{ uri: user.photoURL }} style={styles.userPhoto} />
          <Text>Welcome222, {user.displayName}!</Text>
          <Text>Email: {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
          <Button title="계정 탈퇴" onPress={confirmDelete} color="#FF0000" />
        </View>
      ) : (
        <GoogleLoginButton
          // title="login"
          disabled={!request}
          onPress={() => promptAsync({ useProxy: false })}
        />
      )}
      
    </View>
  );
};

export default LoginScreen;