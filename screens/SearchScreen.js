import { View, Text, Button } from "react-native";
import styles from "../style/SearchStyle";
import Photo from "../components/Photo";
import { useState } from "react";

const SearchScreen = () => {
  const [frontImage, setFrontImage] = useState(null); // 알약 앞면 이미지
  const [backImage, setBackImage] = useState(null); // 알약 뒷면 이미지

  return (
    <View style={styles.container}>
      <Photo label="알약 앞면 이미지" onSelect={(uri) => setFrontImage(uri)} />
      <Photo label="알약 뒷면 이미지" onSelect={(uri) => setBackImage(uri)} />
    </View>
  );
};

export default SearchScreen;