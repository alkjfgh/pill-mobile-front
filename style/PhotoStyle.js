import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const PhotoStyle = StyleSheet.create({
  photoContainer: {
    // marginVertical: 10,
    // alignItems: "center",
    width: width - 40,
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    // fontSize: 16,
    // fontWeight: "bold",
    // marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1a1a1a",
  },
  imageBox: {
    // width: 200,
    // height: 120,
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 8,
    // justifyContent: "center",
    // alignItems: "center",
    width: width - 80,
    height: (width - 80) * 0.6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  image: {
    width: "100%",
    height: "100%",
    // borderRadius: 8,
    borderRadius: 15,
  },
  icon: {
    // width: 20,
    // height: 20,
    // resizeMode: "contain",
    width: 35,
    height: 35,
    resizeMode: "contain",
    // tintColor: "#4a90e2",
  },
});

export default PhotoStyle;