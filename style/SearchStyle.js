import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

const SearchStyle = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    // justifyContent: "center",
    padding: 20,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
    // padding: 10,
    // borderRadius: 8,
    // width: "100%",
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
    // fontSize: 18,
    // fontWeight: "bold",
    // marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a1a1a",
  },
  resultText: {
    // fontSize: 16,
    // color: "#333",
    fontSize: 18,
    color: "#4a4a4a",
    marginBottom: 15,
    textAlign: "center",
  },
  searchButton: {
    width: width - 300,
    marginTop: 15,
    backgroundColor: "#4a90e2",
    borderRadius: 10,
    padding: 15,
  },
  searchButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default SearchStyle;

