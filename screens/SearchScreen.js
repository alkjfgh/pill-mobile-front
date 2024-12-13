import { View, Text, Button, Alert, ActivityIndicator, Modal, TouchableOpacity, ScrollView } from "react-native";
import { useState, useContext, useEffect, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import styles from "../style/SearchStyle";
import Photo from "../components/Photo";
import { RecordContext } from "../context/RecordContext";
import useGetGoogleAuth from "../auth/useGetGoogleAuth"; // Google 인증 상태 가져오기
import Manual from "../components/Manual";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen = () => {
  const { refreshRecords } = useContext(RecordContext); // 기록 추가 함수 가져오기
  const { user } = useGetGoogleAuth(); // 로그인 상태 가져오기
  const [pillImage, setPillImage] = useState(null);
  const [result, setResult] = useState(null); // 서버에서 가져온 결과
  const [detailResult, setDetailResult] = useState(null); // 서버에서 가져온 결과
  // const [translatedResult, setTranslatedResult] = useState(null); // 번역 결과
  const [isLoadingResult, setIsLoadingResult] = useState(false); // 분석 로딩 상태
  const [isSaving, setIsSaving] = useState(false); // 기록 저장 로딩 상태
  const [showManual, setShowManual] = useState(false);
  const [resetPhoto, setResetPhoto] = useState(false);
  const navigation = useNavigation();

  // 서버로 이미지 URI 전송해서 검색
  const sendPillImageToServer  = async (imageUri) => {
    try {
      setIsLoadingResult(true); // 분석 결과 로딩 시작

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
        console.log("FormData" + `${pair[0]}:`, pair[1]);
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
      if (data.message === "알약 이미지 판별 성공" && data.name && data.description) {
        // Alert.alert("성공", `알약 이름: ${data.pill_name}`);
        setResult(data.name);
        setDetailResult(data.description);
        // setTranslatedResult(data.translated_pill_name);
      } else {
        // Alert.alert("에러", "알약 이름을 가져올 수 없습니다.");
        setResult("알약을 판별할 수 없습니다.");
        setDetailResult(null);
      }
    } catch (error) {
      console.log("Error sending images[search]:", error.message);
      if (error.message === "Network request failed") {
        Alert.alert(
          "네트워크 오류",
          "다시 한 번 검색 버튼을 눌러주세요.",
          [{ text: "확인" }],
          { 
            cancelable: true,
            onDismiss: () => console.log('Alert dismissed')
          }
        );
      } else {
        console.error("Error sending images[search]:", error.message);
        Alert.alert(
          "에러", 
          "이미지 전송 중 오류가 발생했습니다.",
          [{ text: "확인" }],
          { 
            cancelable: true,
            onDismiss: () => console.log('Alert dismissed')
          }
        );
      }
    } finally {
      setIsLoadingResult(false); // 분석 결과 로딩 종료
    }
  };

  // 기록 저장 (서버로 전송)
  const saveToServer = async (record) => {
    try {
      setIsSaving(true); // 저장 로딩 시작
      const formData = new FormData();
      formData.append("date", record.date);
      formData.append("image", {
        uri: record.image,
        name: "pill_image.jpg",
        type: "image/jpeg",
      });
      formData.append("result", record.result);
      formData.append("email", record.email);
      formData.append("description", record.description);

      // for (let pair of formData._parts) {
      //   console.log(`FormData 내용 - ${pair[0]}:`, pair[1]);
      // }
      for (let pair of formData._parts) {
        console.log(`FormData 항목 - ${pair[0]}:`);
        console.log('값:', pair[1]);
        console.log('타입:', typeof pair[1]);
        
        // 객체인 경우 더 자세한 정보 출력
        if (typeof pair[1] === 'object' && pair[1] !== null) {
          console.log('객체 상세 정보:', JSON.stringify(pair[1], null, 2));
        }
        console.log('------------------------');
      }

      const res = await fetch("http://1.209.148.143:8883/api/logs/", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Record saved to server:", data);

      if (user?.email) {
        refreshRecords.current(user.email); // Refresh records after saving
      }

      Alert.alert(
        "저장 완료", 
        "기록이 서버에 저장되었습니다!",
        [{ text: "확인" }],
        { 
          cancelable: true,
          onDismiss: () => console.log('Alert dismissed')
        }
      );
    } catch (error) {
      console.log("Error saving record to server:", error.message);
      if (error.message === "Network request failed") {
        Alert.alert(
          "네트워크 오류",
          "다시 한 번 기록 저장 버튼을 눌러주세요.",
          [{ text: "확인" }],
          { 
            cancelable: true,
            onDismiss: () => console.log('Alert dismissed')
          }
        );
      } else {
        console.error("Error saving record to server:", error.message);
        Alert.alert(
          "저장 실패", 
          "서버에 기록을 저장하는 중 오류가 발생했습니다.",
          [{ text: "확인" }],
          { 
            cancelable: true,
            onDismiss: () => console.log('Alert dismissed')
          }
        );
      }
    } finally {
      setIsSaving(false); // 저장 로딩 종료
    }
  };

  // 처음 사용하는 사용자인지 확인
  const checkFirstTime = async () => {
    try {
      const hasShownManual = await AsyncStorage.getItem('hasShownManual');
      if (!hasShownManual) {
        setShowManual(true);
        await AsyncStorage.setItem('hasShownManual', 'true');
      }
    } catch (error) {
      console.log('Error checking first time:', error);
    }
  };

  // 컴포넌트 마운트 시 매뉴얼 표시 여부 확인
  useEffect(() => {
    checkFirstTime();
  }, []);

  // 화면 초기화 함수
  const resetScreenState = () => {
    setResetPhoto(true); // Photo 상태 초기화
    setPillImage(null);
    setResult(null);
    setDetailResult(null);
    setIsLoadingResult(false);
  };

  // 화면이 다시 포커스를 얻으면 상태 초기화
  useFocusEffect(
    useCallback(() => {
      resetScreenState();
      return () => setResetPhoto(false);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Photo 
        label="사진 첨부" 
        reset={resetPhoto}
        onSelect={(uri) => {
          setPillImage(uri);
          sendPillImageToServer(uri);
        }} 
      />

      {/* 서버 결과 표시 */}
      {(isLoadingResult || result) && (
        <View style={styles.resultContainer}>
          {isLoadingResult ? (
            // 분석 결과 로딩 인디케이터
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4a90e2" />
            </View>
          ) : (
            result && (
              <>
                <Text style={styles.resultLabel}>분석 결과</Text>
                <Text style={styles.resultText}>{result}</Text>
                <ScrollView style={styles.scrollView}>
                  {detailResult?.split("\n").map((line, index) => (
                    <Text key={index} style={styles.detailResultText}>
                      {line}
                    </Text>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={styles.searchButton}
                  onPress={async () => {
                    if (!result) {
                      Alert.alert(
                        "경고", 
                        "검색 결과가 없습니다!",
                        [{ text: "확인" }],
                        { 
                          cancelable: true,
                          onDismiss: () => console.log('Alert dismissed')
                        }
                      );
                      return;
                    }

                    if (!user) {
                      Alert.alert(
                        "로그인 필요",
                        "로그인 시 이용 가능합니다!",
                        [
                          {
                            text: "확인",
                            onPress: () => navigation.navigate("계정", { 
                              fromAlert: true,
                              returnScreen: "검색"
                            }),
                          },
                        ],
                        { 
                          cancelable: true,
                          onDismiss: () => console.log('Alert dismissed')
                        }
                      );
                      return;
                    }

                    const now = new Date();
                    const formattedDate = `${now.getFullYear()}-${String(
                      now.getMonth() + 1
                    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
                      now.getHours()
                    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(
                      2,
                      "0"
                    )}:${String(now.getSeconds()).padStart(2, "0")}`;

                    const newRecord = {
                      date: formattedDate,
                      image: pillImage,
                      result,
                      email: user.email,
                      description: detailResult,
                    };

                    await saveToServer(newRecord);
                  }}
                >
                  <Text style={styles.searchButtonText}>기록 저장</Text>
                </TouchableOpacity>
              </>
            )
          )}
        </View>
      )}

      {/* 기록 저장 중 로딩 모달 */}
      {isSaving && (
        <Modal transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Modal>
      )}

      <Manual visible={showManual} onClose={() => setShowManual(false)} />
    </View>
  );
};

export default SearchScreen;