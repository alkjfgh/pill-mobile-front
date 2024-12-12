import { View, Text, Button, Image, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import styles from "../style/LoginStyle";
import useGetGoogleAuth from "../auth/useGetGoogleAuth";
import GoogleLoginButton from "../components/GoogleLoginButton";

const LoginScreen = ({ navigation, route }) => {
  const { user, promptAsync, request } = useGetGoogleAuth();

  // 한 번만 계정 화면으로 이동하도록 플래그 설정
  const hasNavigated = useRef(false);

  // Alert에서 이동한 경우 뒤로가기 시 검색 화면으로 이동
  useFocusEffect(
    useCallback(() => {
      // if (route.params?.fromAlert) {
      //   navigation.navigate("계정"); // 계정 화면으로 이동
      // }
  
      // return () => {
      //   if (route.params?.fromAlert) {
      //     navigation.navigate("DrawerNavigator", {
      //       screen: route.params.returnScreen || "검색", // 기본값 추가
      //       resetAlert: true,
      //     });
      //   }
      // };
      if (route.params?.fromAlert) {
        return () => {
          navigation.navigate("메뉴", {
            screen: route.params.returnScreen,
            resetAlert: true,
          });
        };
      }
      // navigation.navigate("검색");
      // navigation.navigate("메뉴", { screen: "검색" });
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "메뉴", params: { screen: "검색" } }],
      // });
      
    //   if (route.params?.fromAlert && !hasNavigated.current) {
    //   hasNavigated.current = true; // 경로 변경 플래그 설정
    //   navigation.navigate("계정"); // 계정 화면으로 이동
    // }

    // return () => {
    //   // 뒤로 가기 시 한 번만 실행
    //   if (route.params?.fromAlert && hasNavigated.current) {
    //     navigation.navigate("메뉴", { screen: "검색" });
    //   }
    // };
    }, [navigation, route.params])
  );

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.loggedInContainer}>
          <Image source={{ uri: user.photoURL }} style={styles.userPhoto} />
          <View style={styles.userInfo}>
            <Text>name : {user.displayName}</Text>
            <Text>Email: {user.email}</Text>
          </View>
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