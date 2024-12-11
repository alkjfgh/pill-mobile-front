import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, Button, ActivityIndicator } from 'react-native';
import { RecordContext } from '../context/RecordContext';
import styles from "../style/HistoryStyle";
import useGetGoogleAuth from '../auth/useGetGoogleAuth';

const HistoryScreen = () => {
  const { records, refreshRecords } = useContext(RecordContext); // 기록 가져오기
  const [selectedRecord, setSelectedRecord] = useState(null); // 선택된 기록
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const { user } = useGetGoogleAuth(); // 로그인 상태 가져오기
  
  console.log("useGetGoogleAuth 반환값:", { user });

  // 화면 로드 시 서버 데이터 가져오기
  useEffect(() => {
    console.log("user : " + user);
    
    const fetchRecords = async () => {
      if (user?.email) {
        setIsLoading(true); // 로딩 시작
        await refreshRecords.current(user.email);
        setIsLoading(false); // 로딩 종료
      }
    };
    fetchRecords();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>검색 기록</Text>
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingSpinner} />
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recordItem}
              onPress={() => setSelectedRecord(item)}
            >
              <Text style={styles.recordDate}>날짜 : {item.date}</Text>
              <View style={styles.recordContent}>
                {/* <Text style={styles.recordImage}>{item.image}</Text> */}
                <Image 
                  source={{ uri: item.imageUrl }} 
                  style={styles.recordImage}
                  resizeMode="contain" />
                <View style={styles.recordDetails}>
                  <Text style={styles.recordText}>
                    결과 : {item.result.length > 15 ? `${item.result.slice(0, 15)}...` : item.result}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* 상세 모달 */}
      {selectedRecord && (
        <Modal visible={true} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalDate}>날짜 : {selectedRecord.date}</Text>
              <Image 
                source={{ uri: selectedRecord.imageUrl }} 
                style={styles.modalImage} 
                resizeMode="contain"
              />
              <Text style={styles.modalText}>결과: {selectedRecord.result}</Text>
              <Button title="닫기" onPress={() => setSelectedRecord(null)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default HistoryScreen;