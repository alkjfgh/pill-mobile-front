import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import styles from "./style/AppStyle";
import SplashScreenComponent from './components/SplashScreenComponent';
import { RecordProvider } from "./context/RecordContext";
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from "./screens/LoginScreen";
import SearchScreen from "./screens/SearchScreen";
import HistoryScreen from "./screens/HistoryScreen";
import MyCustomDrawer from "./components/MyCustomDrawer";
import OnboardingScreen from "./screens/OnboardingScreen";
import SettingScreen from './screens/SettingScreen';
import { useEffect, useState } from 'react';

const Drawer = createDrawerNavigator();

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <NavigationContainer>
      <RecordProvider>
        <SplashScreenComponent>
          <Drawer.Navigator
            drawerContent={props => <MyCustomDrawer {...props} />}
            initialRouteName={showOnboarding ? "OnboardingScreen" : "검색"}
            screenOptions={{
              drawerActiveBackgroundColor: '#E2E2E2',
              drawerActiveTintColor: 'black',
              drawerInactiveTintColor: '#333333',
              headerStyle: {
                backgroundColor: 'white',
                elevation: 0,            // 안드로이드 그림자 제거
                shadowOpacity: 0,        // iOS 그림자 제거
              },
              headerTintColor: 'black',
              headerTitleAlign: 'center',
              drawerStyle: {
                width: '75%',    // 드로어 너비
              },
              overlayColor: 'rgba(0,0,0,0.3)',
              drawerItemStyle: {
                borderRadius: 10,  // 드로어 아이템의 모서리를 각지게
              }
            }}
          >
            {showOnboarding ? (
              <Drawer.Screen 
                name="OnboardingScreen" 
                options={{ headerShown: false }}
              >
                {(props) => (
                  <OnboardingScreen 
                    {...props} 
                    onDone={() => setShowOnboarding(false)} 
                  />
                )}
              </Drawer.Screen>
            ) : (
              <>
                <Drawer.Screen name="검색" component={SearchScreen} />
                <Drawer.Screen name="기록" component={HistoryScreen} />
                <Drawer.Screen name="LoginScreen" component={LoginScreen} />
                <Drawer.Screen 
                  name="SettingScreen" 
                  component={SettingScreen} 
                  options={{ 
                    drawerItemStyle: { display: 'none' },  // 드로어 메뉴에서 숨김
                    title: "설정"  // 헤더 타이틀
                  }} 
                />
              </>
            )}
          </Drawer.Navigator>
        </SplashScreenComponent>
      </RecordProvider>
    </NavigationContainer>
  );
}