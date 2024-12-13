import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Animated, ScrollView, ActivityIndicator } from 'react-native';
import { RecordContext } from '../context/RecordContext';
import styles from "../style/HistoryStyle";
import useGetGoogleAuth from '../auth/useGetGoogleAuth';

const HistoryScreen = () => {
  const { records, refreshRecords } = useContext(RecordContext); // 기록 가져오기
  const [expandedRecordId, setExpandedRecordId] = useState(null); // 확장된 텍스트 ID
  const heightAnimRefs = useRef({}); // 각 아이템의 애니메이션 높이를 관리
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const { user } = useGetGoogleAuth(); // 로그인 상태 가져오기
  const [contentHeight, setContentHeight] = useState({});
  const [measuredHeight, setMeasuredHeight] = useState({});

  // const sortedRecords = records ? [...records].sort((a, b) => new Date(b.date) - new Date(a.date)) : [];

  const sortedRecords = records ? 
  [...records]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((record, index) => ({
      ...record,
      id: record.id || `record-${index}` // id가 없으면 임의로 생성
    })) 
  : [];

  useEffect(() => {
    const fetchRecords = async () => {
      if (user?.email) {
        setIsLoading(true); // 로딩 시작
        if (refreshRecords?.current) {
          await refreshRecords.current(user.email); // 데이터 가져오기
        }
        setIsLoading(false); // 로딩 종료
      }
    };
    fetchRecords();
  }, [user]);

  const toggleExpand = (id) => {
    console.log(`Toggling item with id: ${id}`); // 콘솔 로그 추가
    
    if (!heightAnimRefs.current[id]) {
      heightAnimRefs.current[id] = new Animated.Value(0);
    }

    if (expandedRecordId === id) {
      // 닫기 애니메이션
      Animated.timing(heightAnimRefs.current[id], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpandedRecordId(null));
    } else {
      // 이전 아이템 닫기
      if (expandedRecordId && heightAnimRefs.current[expandedRecordId]) {
        Animated.timing(heightAnimRefs.current[expandedRecordId], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }

      // 새 아이템 열기
      setExpandedRecordId(id);
      console.log('measuredHeight[id]:', measuredHeight[id]);
      Animated.timing(heightAnimRefs.current[id], {
        toValue: measuredHeight[id] || 200,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const renderRecordItem = ({ item }) => {
    console.log('Item data:', item); // 전체 아이템 데이터 확인
    console.log('Item ID:', item.id); // ID 값 확인

    const isExpanded = expandedRecordId === item.id; // 확장 여부 확인

    if (!heightAnimRefs.current[item.id]) {
      heightAnimRefs.current[item.id] = new Animated.Value(0);
    }

    return (
      <View style={styles.recordItem}>
        <TouchableOpacity
          onPress={() => toggleExpand(item.id)}
        >
          <View style={styles.dateView}> 
            <Text style={styles.recordDate}>날짜 : {item.date}</Text>
          </View>
          <View style={styles.recordContent}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.recordImage}
              resizeMode="contain"
            />
            <View style={styles.recordDetails}>
              <Text style={styles.recordText} numberOfLines={2}>
                {item.result}
              </Text>
              {!isExpanded && (  // 확장되지 않았을 때만 description 표시
                <Text 
                  numberOfLines={2} 
                  ellipsizeMode="tail"
                  style={styles.expandedText}
                >
                  {item.description}
                </Text>
              )}
            </View>

            {/* 측정용 숨겨진 텍스트 - 줄 제한 없음 */}
            <View
              style={{ 
                position: 'absolute', 
                opacity: 0,
                left: -9999,  // 화면 밖으로 이동
                width: '100%' // 너비 설정
              }}
              onLayout={(event) => {
                const height = event.nativeEvent.layout.height;
                if (height > 0) {
                  setMeasuredHeight(prev => ({
                    ...prev,
                    [item.id]: height
                  }));
                }
              }}
            >
              <Text 
                 style={[
                  styles.expandedText,
                  { flexShrink: 0 }  // 텍스트가 줄어들지 않도록 설정
                ]}
                numberOfLines={undefined}  // 줄 제한 해제
              >
                {item.description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* 확장된 텍스트 */}
        <Animated.View style={[styles.expandedContainer, { height: heightAnimRefs.current[item.id], overflow: 'hidden' }]}>
          {/* {isExpanded && (
            <ScrollView
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setContentHeight(prev => ({...prev, [item.id]: height}));
              }}
            >
              <Text style={styles.expandedText}>
                {item.description}
              </Text>
            </ScrollView>
          )} */}
          {/* <View
            onLayout={(event) => {
              // const height = event.nativeEvent.layout.height;
              // setMeasuredHeight(prev => ({
              //   ...prev,
              //   [item.id]: height
              // }));
              const height = event.nativeEvent.layout.height;
              if (height > 0) {  // 높이가 0보다 큰 경우에만 저장
                setMeasuredHeight(prev => ({
                  ...prev,
                  [item.id]: height
                }));
              }
            }}
          > */}
            <Text style={styles.expandedText}>
              {item.description}
            </Text>
          {/* </View> */}
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingSpinner} />
      ) : (
        <FlatList
          data={sortedRecords}
          keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
          renderItem={renderRecordItem}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>저장된 기록이 없습니다.</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default HistoryScreen;