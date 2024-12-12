import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

const SearchStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    padding: 20,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    width: width - 40,
    shadowColor: "#000",
    shandowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a1a1a",
  },
  resultText: {
    fontSize: 18,
    color: "#4a4a4a",
    marginBottom: 15,
    textAlign: "center",
  },
  // searchButton: {
  //   width: width - 300,
  //   marginTop: 15,
  //   backgroundColor: '#ffffff',
  //   borderWidth: 1,
  //   borderColor: '#e0e0e0',
  //   borderRadius: 10,
  //   padding: 15,
  // },
  // searchButtonText: {
  //   color: '#4a4a4a',
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  searchButton: {
    width: width - 300,
    marginTop: 15,
    backgroundColor: '#ffffff', // 흰색 배경
    borderWidth: 1,
    borderColor: '#cccccc', // 연한 회색 경계
    borderRadius: 10, // 부드러운 모서리
    paddingVertical: 15, // 버튼의 상하 간격
    paddingHorizontal: 20, // 버튼의 좌우 간격
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0.1, // 그림자 투명도
    shadowRadius: 4, // 그림자 반경
    elevation: 3, // Android 그림자
    alignItems: 'center', // 텍스트 가운데 정렬
  },
  searchButtonText: {
    color: '#4a4a4a', // 버튼 텍스트 색상
    fontSize: 16, // 폰트 크기
    fontWeight: "600", // 약간 두꺼운 글꼴
    textAlign: "center", // 가운데 정렬
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default SearchStyle;

