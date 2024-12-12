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

const Stack = createStackNavigator();

const sendRequest = async () => {
  const SERVER_URL = Constants.expoConfig.extra.serverUrl;

  console.log("Sending request to:", SERVER_URL);

  try {
    const response = await fetch(`${SERVER_URL}/api/test`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data);
  } catch (error) {
    console.error("Error in fetch:", error.message);
  }
};

export default function App() {
  useEffect(() => {
    sendRequest(); // 앱 시작 시 서버 요청 실행
  }, []);

  return (
    <NavigationContainer>
      <RecordProvider>
        <SplashScreenComponent>
          <Stack.Navigator>
            <Stack.Screen 
              name="DrawerNavigator" 
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
          <StatusBar style="auto" />
        </SplashScreenComponent>
      </RecordProvider>
    </NavigationContainer>
  );
}