import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import styles from "./style/AppStyle";
import MainScreen from './screens/MainScreen';
import SplashScreenComponent from './components/SplashScreenComponent';
import { RecordProvider } from "./context/RecordContext";
import LoginScreen from "./screens/LoginScreen";
import SearchScreen from "./screens/SearchScreen";
import HistoryScreen from "./screens/HistoryScreen";
import MyCustomDrawer from "./components/MyCustomDrawer";
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RecordProvider>
        <SplashScreenComponent>
          <Drawer.Navigator
            drawerContent={props => <MyCustomDrawer {...props} /> } 
            screenOptions = {
              {
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
              }
            }
          >
            <Drawer.Screen name="LoginScreen" component={LoginScreen} />
            <Drawer.Screen name="MainScreen" component={MainScreen} />
            <Drawer.Screen name="SearchScreen" component={SearchScreen} />
            <Drawer.Screen name="HistoryScreen" component={HistoryScreen} />
          </Drawer.Navigator>
        </SplashScreenComponent>
      </RecordProvider>
    </NavigationContainer>
  );
}
