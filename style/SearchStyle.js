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
    height: 300,
    alignItems: "center", // 모든 내용 가운데 정렬
    justifyContent: "center", // 로딩 시 중앙 정렬
  },
  loadingContainer: {
    flex: 1, // 전체 공간 사용
    justifyContent: "center", // 수직 중앙 정렬
    alignItems: "center", // 수평 중앙 정렬
  },
  scrollView: {
    flex: 1,
    width: "100%",
    marginTop: 10,
  },
  resultLabel: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a1a1a",
  },
  resultText: {
    fontSize: 20,
    color: "#4a4a4a",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  detailResultText: {
    fontSize: 16, // 약간 작은 크기로 조정
    color: "#4a4a4a",
    lineHeight: 22, // 줄 간격 추가
    textAlign: "left", // 왼쪽 정렬
    marginBottom: 10, // 아래 여백 추가
  },
  searchButton: {
    marginTop: 15,
    backgroundColor: '#ffffff', // 흰색 배경
    borderWidth: 1,
    borderColor: '#cccccc', // 연한 회색 경계
    borderRadius: 10, // 부드러운 모서리
    paddingVertical: 15, // 버튼의 상하 간격
    paddingHorizontal: 20, // 버튼의 좌우 간격
  },
  searchButtonText: {
    color: '#4a4a4a', // 버튼 텍스트 색상
    fontSize: 16, // 폰트 크기
    fontWeight: "600", // 약간 두꺼운 글꼴
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default SearchStyle;

