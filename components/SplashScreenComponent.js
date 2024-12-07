import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync(); // 스플래시 화면 유지

export default function SplashScreenComponent({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      // 최소 3초 로딩
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await SplashScreen.hideAsync(); // 스플래시 숨기기
      setIsReady(true); // 로딩 완료
    };

    prepare();
  }, []);

  if (!isReady) {
    // 로딩 중: 스플래시 화면 렌더링
    return (
      <View style={styles.splashContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>
    );
  }

  // 로딩 완료: 실제 화면 렌더링
  return children;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});
