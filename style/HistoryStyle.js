import { Dimensions, Platform, StyleSheet } from "react-native";

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
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
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
  recordText: {
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "500",
    lineHeight: 22,
  },
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalDate: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    fontWeight: "500",
  },
  modalImage: {
    width: Dimensions.get("window").width * 0.8,
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  modalText: {
    fontSize: 18,
    color: "#1a1a1a",
    marginBottom: 20,
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingSpinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    minHeight: Dimensions.get('window').height - 200,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default HistoryStyle;

