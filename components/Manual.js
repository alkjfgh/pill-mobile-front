import React from 'react';
import { Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../style/ManualStyle';

const Manual = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>사용 방법</Text>
            <Text style={styles.subtitle}>1. 알약 촬영/선택</Text>
            <Text style={styles.description}>
              - 알약을 촬영하거나 갤러리에서 선택하세요
            </Text>
            <Text style={styles.description}>
              - 알약이 잘 보이도록 밝은 곳에서 촬영해주세요
            </Text>
            <Text style={styles.description}>
              - 알약의 글자가 잘 보이도록 촬영해주세요
            </Text>
            <Text style={styles.description}>
              - 인식이 잘 안된다면 반대편을 촬영해주세요
            </Text>
            
            <Text style={styles.subtitle}>2. 검색하기</Text>
            <Text style={styles.description}>
              - 이미지 선택 후 검색 버튼을 눌러주세요
            </Text>
            
            <Text style={styles.subtitle}>3. 결과 저장</Text>
            <Text style={styles.description}>
              - 분석 결과를 저장하려면 로그인이 필요합니다
            </Text>
            <Text style={styles.description}>
              - 저장된 기록은 기록 탭에서 확인할 수 있습니다
            </Text>
          </ScrollView>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Manual;