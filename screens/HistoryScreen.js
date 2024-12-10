import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, Button, Alert } from 'react-native';
import { RecordContext } from '../context/RecordContext';
import styles from "../style/HistoryStyle";
import useGetGoogleAuth from '../auth/useGetGoogleAuth';

const HistoryScreen = () => {
  const { records, setRecords } = useContext(RecordContext); // 기록 가져오기
  const [selectedRecord, setSelectedRecord] = useState(null); // 선택된 기록
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const { user } = useGetGoogleAuth(); // 로그인 상태 가져오기
  // console.log("rescods" + user.email);
  // 서버에서 기록 데이터 가져오기
  const fetchRecordsFromServer = async () => {
    if (!user || !user.email) {
      console.log("사용자 정보가 없습니다.");
      setIsLoading(false); // 로딩 상태 해제
      return;
    }
    console.log("email : " + user.email);
    
    try {
      const res = await fetch(`http://1.209.148.143:8883/api/logs/${user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const fetchedRecords = await res.json();
      const logs = fetchedRecords.logs;
      console.log("Fetched Records:", fetchedRecords);
      console.log("logs:", logs);

      // 데이터 매핑 (서버 데이터 형식을 앱에서 사용할 형식으로 변환)
      const formattedRecords = logs.map(record => ({
        email: record.email,
        image: record.image,
        result: record.result,
        date: new Date(record.date).toLocaleString(), // 날짜 포맷 변경
      }));

      setRecords(formattedRecords); // 컨텍스트에 저장
      setIsLoading(false); // 로딩 상태 해제
    } catch (error) {
      console.error('Error fetching records:', error.message);
      Alert.alert('오류', '기록 데이터를 불러오는 중 문제가 발생했습니다.');
      setIsLoading(false);
    }
  };

  // 화면 로드 시 서버 데이터 가져오기
  useEffect(() => {
    fetchRecordsFromServer();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>검색 기록</Text>
      
      {isLoading ? (
        <Text style={styles.loadingText}>기록을 불러오는 중...</Text>
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
                <Text style={styles.recordImage}>{item.image}</Text>
                {/* <Image source={{ uri: item.image }} style={styles.recordImage} /> */}
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
              <Image source={{ uri: selectedRecord.image }} style={styles.modalImage} />
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