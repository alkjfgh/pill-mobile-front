import { StyleSheet, Platform } from "react-native";

const HistoryStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  recordItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    marginVertical: 1,
  },
  recordDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    fontWeight: "500",
  },
  recordContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  recordImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#f1f3f5",
  },
  recordDetails: {
    marginLeft: 16,
    flex: 1,
  },
  dateView:{
    justifyContent:"center",
    alignItems:"center",
  },
  recordText: {
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "500",
    lineHeight: 22,
    
  },
  expandedContainer: {
    overflow: "hidden", // 텍스트가 부드럽게 확장되도록 설정
    marginTop: 8,
  },
  expandedText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  expandButton: {
    backgroundColor: "#007BFF",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  expandButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    lineHeight: 24,
  },
  loadingSpinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // 주석 처리된 모달 스타일
  /*
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  modalDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  closeButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  */
});

export default HistoryStyle;