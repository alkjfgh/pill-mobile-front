import { StyleSheet } from 'react-native';

const PhotoStyle = StyleSheet.create({
  photoContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  imageBox: {
    width: 200,
    height: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    fontSize: 24,
    color: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default PhotoStyle;