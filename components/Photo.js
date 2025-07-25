import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../style/PhotoStyle";
import camera from "../assets/camera.png";

const Photo = ({ label, onSelect, reset }) => {
  const [photoUri, setPhotoUri] = useState(null);

  const selectImage = async () => {
    // 카메라 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "권한 필요",
        "갤러리 및 카메라 접근 권한이 필요합니다.",
        [{ text: "확인" }],
        {
          cancelable: true,
          onDismiss: () => console.log('Alert dismissed')
        }
      );
      return;
    }

     // 사용자에게 선택지 제공
    Alert.alert(
      "사진 선택",
      "사진을 선택할 방법을 고르세요.",
      [
        {
          text: "카메라 촬영",
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
              console.log("이미지 URI : " + result.assets[0].uri);
              setPhotoUri(result.assets[0].uri);
              onSelect(result.assets[0].uri);
            }
          },
        },
        {
          text: "갤러리에서 선택",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
              console.log("이미지 URI : " + result.assets[0].uri);
              setPhotoUri(result.assets[0].uri);
              onSelect(result.assets[0].uri);
            }
          },
        },
        {
          text: "취소",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log('Alert dismissed')
      }
    );
  };

  // 부모 컴포넌트에서 reset이 true가 되면 초기화
  useEffect(() => {
    if (reset) {
      setPhotoUri(null);
    }
  }, [reset]);

  console.log("Photo 컴포넌트 리렌더링 : " + photoUri);

  return (
    <View style={styles.photoContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.imageBox} onPress={selectImage}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.image} />
        ) : (
          <Image source={camera} style={styles.icon} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Photo;