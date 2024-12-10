import { StyleSheet } from "react-native";

const HistoryStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recordItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  recordDate: {
    marginBottom: 5,
    fontSize: 12,
    color: "#666",
  },
  recordContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  recordImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 8,
  },
  recordDetails: {
    marginLeft: 10,
    flex: 1,
  },
  recordText: {
    fontSize: 14,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  modalDate: {
    marginBottom: 10,
    fontSize: 14,
    color: "#666",
  },
  modalImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});

export default HistoryStyle;

