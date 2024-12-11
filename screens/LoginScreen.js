import { View, Text, Button, Image, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import styles from "../style/LoginStyle";
import useGetGoogleAuth from "../auth/useGetGoogleAuth";
import GoogleLoginButton from "../components/GoogleLoginButton";

const LoginScreen = ({ navigation, route }) => {
  const { user, promptAsync, request } = useGetGoogleAuth();

  // Alert에서 이동한 경우 뒤로가기 시 검색 화면으로 이동
  useFocusEffect(
    useCallback(() => {
      if (route.params?.fromAlert) {
        return () => {
          navigation.navigate("DrawerNavigator", {
            screen: route.params.returnScreen,
            resetAlert: true,
          });
        };
      }
    }, [navigation, route.params])
  );

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.loggedInContainer}>
          <Image source={{ uri: user.photoURL }} style={styles.userPhoto} />
          <Text>Welcome222, {user.displayName}!</Text>
          <Text>Email: {user.email}</Text>
        </View>
      ) : (
        <View style={styles.loginContainer}>
          {/* 로고 영역 */}
          <Image
            source={require("../assets/logo.png")} // 앱 로고 이미지
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>소셜 로그인</Text>

          {/* 구분선 */}
          <View style={styles.divider} />

          {/* 구글 로그인 버튼 */}
          <GoogleLoginButton
            disabled={!request}
            onPress={() => promptAsync({ useProxy: false })}
          />
        </View>
      )}
      
    </View>
  );
};

export default LoginScreen;