import { TouchableOpacity, Image, StyleSheet } from "react-native";
import img from "../assets/google_login_img.png";

const GoogleLoginButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={img} // 이미지 경로 설정
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 200, // 버튼 너비 (이미지 비율에 맞게 조정)
    height: 50,  // 버튼 높이
    resizeMode: "contain",
  },
});

export default GoogleLoginButton;