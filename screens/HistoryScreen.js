import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Animated, ScrollView, ActivityIndicator } from 'react-native';
import { RecordContext } from '../context/RecordContext';
import styles from "../style/HistoryStyle";
import useGetGoogleAuth from '../auth/useGetGoogleAuth';

const HistoryScreen = () => {
  const { records, refreshRecords } = useContext(RecordContext); // 기록 가져오기
  const [expandedRecordId, setExpandedRecordId] = useState(null); // 확장된 텍스트 ID
  // const [heightAnim, setHeightAnim] = useState(new Animated.Value(0)); // 애니메이션 높이
  const heightAnimRefs = useRef({}); // 각 아이템의 애니메이션 높이를 관리
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const { user } = useGetGoogleAuth(); // 로그인 상태 가져오기

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
      // 열기 애니메이션
      // setExpandedRecordId(id);
      // Animated.timing(heightAnim, {
      //   toValue: 200, // 원하는 확장 높이 설정
      //   duration: 300,
      //   useNativeDriver: false,
      // }).start();
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
      Animated.timing(heightAnimRefs.current[id], {
        toValue: 200, // 원하는 확장 높이 설정
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
              <Text numberOfLines={2} ellipsizeMode="tail">
              ("18세기 말에 아시아의 각 원종이 유럽에 도입되고 이들 유럽과 아시아 원종간의 교배가 이루어져 화색이나 화형은 물론 사계성이나 개화성 등 생태적으로 변화가 많은 품종들이 만들어졌다.")
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* 확장된 텍스트 */}
        {/* {isExpanded && (
          <Animated.View style={[styles.expandedContainer, { height: heightAnimRefs.current[item.id] }]}>
            <ScrollView>
              <Text style={styles.expandedText}>
                {item.result}란? ("18세기 말에 아시아의 각 원종이 유럽에 도입되고 이들 유럽과 아시아 원종간의 교배가 이루어져 화색이나 화형은 물론 사계성이나 개화성 등 생태적으로 변화가 많은 품종들이 만들어졌다. 
                18세기 이전의 장미를 고대장미(old rose), 19세기 이후의 장미를 현대장미(modern rose)라 한다.
                장미는 온대성의 상록관목으로 햇빛을 좋아하는 식물이다. 적정생육온도는 구간 24~27℃이고 야간온도 15~18℃이다. 
                30℃이상이면 꽃이 작아지고 꽃잎수가 줄어들어 퇴색하고 잎이 작아지며 엽색이 진해진다. 5℃정도이면 생육이 정지되고 0℃이하가 되면 낙엽이 지면서 휴면에 들어간다.")
              </Text>
            </ScrollView>
          </Animated.View>
        )} */}
        <Animated.View style={[styles.expandedContainer, { height: heightAnimRefs.current[item.id], overflow: 'hidden', display: isExpanded ? 'flex' : 'none' }]}>
          {isExpanded && (
            <ScrollView>
              <Text style={styles.expandedText}>
                {item.result}란? ("18세기 말에 아시아의 각 원종이 유럽에 도입되고 이들 유럽과 아시아 원종간의 교배가 이루어져 화색이나 화형은 물론 사계성이나 개화성 등 생태적으로 변화가 많은 품종들이 만들어졌다. 
                18세기 이전의 장미를 고대장미(old rose), 19세기 이후의 장미를 현대장미(modern rose)라 한다.
                장미는 온대성의 상록관목으로 햇빛을 좋아하는 식물이다. 적정생육온도는 구간 24~27℃이고 야간온도 15~18℃이다. 
                30℃이상이면 꽃이 작아지고 꽃잎수가 줄어들어 퇴색하고 잎이 작아지며 엽색이 진해진다. 5℃정도이면 생육이 정지되고 0℃이하가 되면 낙엽이 지면서 휴면에 들어간다.")
              </Text>
            </ScrollView>
          )}
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