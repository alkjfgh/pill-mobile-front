import { createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import { Alert } from "react-native";

import LoginScreen from "../screens/LoginScreen";
import SearchScreen from "../screens/SearchScreen";
import HistoryScreen from "../screens/HistoryScreen";
import MyCustomDrawer from "./MyCustomDrawer";
import OnboardingScreen from "../screens/OnboardingScreen";
import useGetGoogleAuth from "../auth/useGetGoogleAuth";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const { user } = useGetGoogleAuth();

  useEffect(() => {
    console.log("현재 로그인 사용자:", user);
  }, [user]);

  // const handleHistoryAccess = ({ navigation }) => {
  //   if (!user) {
  //     Alert.alert(
  //       "로그인 필요",
  //       "기록 화면은 로그인 후 이용 가능합니다.",
  //       [
  //         {
  //           text: "확인",
  //           onPress: () => navigation.navigate("LoginScreen"), // 로그인 화면으로 이동
  //         },
  //       ]
  //     );
  //     return null; // 화면 렌더링하지 않음
  //   }
  //   return <HistoryScreen />; // user가 있는 경우 기록 화면 렌더링
  // };

  return(
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
          <Drawer.Screen
            name="기록"
            options={{ headerShown: true }}
            listeners={({ navigation }) => ({
              focus: () => {
                if (!user) {
                  Alert.alert(
                    "로그인 필요",
                    "기록 화면은 로그인 후 이용 가능합니다.",
                    [
                      {
                        text: "확인",
                        onPress: () => navigation.navigate("LoginScreen"),
                      },
                    ]
                  );
                }
              },
            })}
            component={HistoryScreen}
          />
          <Drawer.Screen name="LoginScreen" component={LoginScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;