import { StyleSheet } from "react-native";

const SearchStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
  accuracyText: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
  },
});

export default SearchStyle;

