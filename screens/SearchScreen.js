import { View, Text, Button, Alert } from "react-native";
import styles from "../style/SearchStyle";
import Photo from "../components/Photo";
import { useState } from "react";

const SearchScreen = () => {
  const [pillImage, setPillImage] = useState(null);
  const [result, setResult] = useState(null); // 서버에서 가져온 결과

  // 서버로 이미지 URI 전송
  const sendPillImageToServer  = async (imageUri) => {
    try {
      // FormData 객체 생성
      const formData = new FormData();

      // 이미지 파일 추가
      formData.append("request", {
        uri: imageUri, // 이미지 URI
        name: "pill_image.jpg", // 파일 이름
        type: "image/jpeg", // MIME 타입
      });

      // FormData 내용 출력
      for (let pair of formData._parts) {
        console.log(`${pair[0]}:`, pair[1]);
      }
  
      const res = await fetch("http://1.209.148.143:8883/api/disPill/", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status[search]: ${res.status}`);
      }
  
      const data = await res.json();
      console.log("Response Data[search]:", data);
      
      // 서버 응답 확인 후 Alert 출력
      if (data.message === "알약 이미지 판별 성공" && data.pill_name) {
        // Alert.alert("성공", `알약 이름: ${data.pill_name}`);
        setResult(data.pill_name);
      } else {
        // Alert.alert("에러", "알약 이름을 가져올 수 없습니다.");
        setResult("알약을 판별할 수 없습니다.");
      }
    } catch (error) {
      console.error("Error sending images[search]:", error.message);
      Alert.alert("에러", "이미지 전송 중 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Photo label="알약 이미지" onSelect={(uri) => setPillImage(uri)} />
      <Button title="검색" onPress={() => {
          if (pillImage) {
            sendPillImageToServer(pillImage);
          } else {
            Alert.alert("경고", "이미지를 선택해주세요!");
          }
        }} 
      />

      {/* 서버 결과 표시 */}
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>분석 결과</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;