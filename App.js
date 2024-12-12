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

export default function App() {
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