import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import styles from "./style/AppStyle";
import SplashScreenComponent from './components/SplashScreenComponent';
import { RecordProvider } from "./context/RecordContext";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import DrawerNavigator from "./components/DrawerNavigator";
import SettingScreen from './screens/SettingScreen';
import { useEffect, useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import OnboardingScreen from './screens/OnboardingScreen';

const Stack = createStackNavigator();

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasShownOnboarding = await AsyncStorage.getItem('hasShownOnboarding');
      setShowOnboarding(!hasShownOnboarding);
      setIsReady(true);
    };
    checkOnboarding();
  }, []);

  if (!isReady) {
    return null; // 로딩 중 화면 (필요시 로딩 컴포넌트를 추가 가능)
  }

  return (
    <NavigationContainer>
      <RecordProvider>
        <SplashScreenComponent>
          {showOnboarding ? (
            <OnboardingScreen onDone={async () => {
              await AsyncStorage.setItem('hasShownOnboarding', 'true');
              setShowOnboarding(false);
            }} />
          ) : (
            <Stack.Navigator>
              <Stack.Screen 
                name="메뉴" 
                component={DrawerNavigator} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="SettingScreen" 
                component={SettingScreen}
                options={{ title: "설정" }} 
              />
              <Stack.Screen 
                name="계정" 
                component={LoginScreen} 
                options={{ title: "계정" }} 
              />
            </Stack.Navigator>
          )}
          <StatusBar style="auto" />
        </SplashScreenComponent>
      </RecordProvider>
    </NavigationContainer>
  );
}