import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const PhotoStyle = StyleSheet.create({
  photoContainer: {
    width: width - 40,
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1a1a1a",
  },
  imageBox: {
    borderWidth: 1,
    borderRadius: 10,
    width: width - 40,
    height: (width - 40) * 0.6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "contain",
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
});

export default PhotoStyle;