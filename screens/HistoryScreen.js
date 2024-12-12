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

  // 정렬된 기록을 반환하는 함수
  const sortedRecords = [...records].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        아직 저장된 기록이 없습니다.{"\n"}알약을 검색하고 결과를 저장해보세요.
      </Text>
    </View>
  );

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
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingSpinner} />
      ) : (
        <FlatList
          data={sortedRecords}
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
                  {/* <Text style={styles.recordText}>
                    결과 : {item.result.length > 15 ? `${item.result.slice(0, 15)}...` : item.result}
                  </Text> */}
                    <Text style={styles.recordText} numberOfLines={2}>
                      {item.result}
                    </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* 상세 모달 */}
      {selectedRecord && (
        <Modal 
          visible={true} 
          transparent={true} 
          animationType="slide"
          onRequestClose={() => setSelectedRecord(null)} // 안드로이드 뒤로가기 버튼 처리
        >
          <TouchableOpacity 
            style={styles.modalContainer}
            activeOpacity={1}
            onPress={() => setSelectedRecord(null)} // 바깥 영역 터치시 닫기
          >
            <TouchableOpacity 
              style={styles.modalContent}
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()} // 모달 내부 터치시 닫히지 않도록
            >
              <Text style={styles.modalDate}>날짜 : {selectedRecord.date}</Text>
              <Image 
                source={{ uri: selectedRecord.imageUrl }} 
                style={styles.modalImage} 
                resizeMode="contain"
              />
              {/* <Text style={styles.modalText}>결과: {selectedRecord.result}</Text> */}
              <Text style={styles.modalText}>{selectedRecord.result}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setSelectedRecord(null)}
              >
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default HistoryScreen;