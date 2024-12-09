import { StyleSheet } from "react-native";

const AppStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flexGrow: 1, // ScrollView 내부 공간 확장
    justifyContent: "center", // 수직 중앙 정렬
    alignItems: "center", // 가로 중앙 정렬
  },
});

export default AppStyle;

