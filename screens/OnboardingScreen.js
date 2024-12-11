import React from 'react';
import { View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/OnboardingStyle';

const slides = [
  {
    key: 1,
    title: '알약 검색',
    text: '알약 사진을 찍어서\n어떤 약인지 확인해보세요',
    image: require('../assets/search_onboarding.png')
  },
  {
    key: 2,
    title: '검색 기록',
    text: '이전에 검색했던\n알약들을 확인할 수 있어요',
    image: require('../assets/history_onboarding.png')
  },
  {
    key: 3,
    title: '시작하기',
    text: '지금 바로 시작해보세요!',
    image: require('../assets/logo.png')
  }
];

const OnboardingScreen = ({ onDone }) => {

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        {index === slides.length - 1 && (
          <View style={[styles.buttonCircle, { marginTop: 30 }]}>
            <Text 
              style={styles.buttonText}
              onPress={handleDone}
            >
              시작하기
            </Text>
          </View>
        )}
      </View>
    );
  };

  const handleDone = async () => {
    try {
      // await AsyncStorage.setItem('@onboarding_complete', 'true');
      onDone();
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    />
  );
};

export default OnboardingScreen;