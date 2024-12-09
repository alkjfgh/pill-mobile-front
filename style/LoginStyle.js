import { StyleSheet } from "react-native";

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loggedInContainer: {
    alignItems: "center", // 로그인 화면 요소 가운데 정렬
  },
  userPhoto: {
    width: 100,   // 사진의 너비
    height: 100,  // 사진의 높이
    borderRadius: 50, // 사진을 원형으로 표시
    marginBottom: 20, // 아래 요소와 간격
  },
});

export default LoginStyle;

