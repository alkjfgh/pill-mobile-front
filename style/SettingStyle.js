import { Platform, StyleSheet } from "react-native";

const SettingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? 0 : 16,
    paddingHorizontal: 0,
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
  },
  buttonText: {
    fontSize: 14,
    color: "#333",
  },
  appText:{
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
  },
  sectionTitle: {
   margin: 18,
   fontWeight: 'bold'
  },
  userPhoto:{
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  versionText: {
    fontSize: 14, // 동일한 크기로 설정
    color: "gray",
    textAlign: "right", // 텍스트를 오른쪽 정렬
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between", // 양 끝으로 정렬
    alignItems: "center", // 세로축 중앙 정렬
  },
  deleteButton: {
    marginTop: 'auto',  
    marginBottom: 20,   
    backgroundColor: 'red',  
  },
  deleteButtonText: {
    color: '#fff',  
  },
});

export default SettingStyle;

