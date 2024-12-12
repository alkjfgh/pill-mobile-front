import { createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import { Alert, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SearchScreen from "../screens/SearchScreen";
import HistoryScreen from "../screens/HistoryScreen";
import MyCustomDrawer from "./MyCustomDrawer";
import OnboardingScreen from "../screens/OnboardingScreen";
import useGetGoogleAuth from "../auth/useGetGoogleAuth";
import Manual from "./Manual";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation, route }) => {
  const { user } = useGetGoogleAuth();
  // const [showOnboarding, setShowOnboarding] = useState(true);
  const [alertShown, setAlertShown] = useState(false);
  const [isManualVisible, setIsManualVisible] = useState(false);

  useEffect(() => {
    console.log("현재 로그인 사용자:", user);
    if(user){
      setAlertShown(false);
      console.log("alertShown 초기화 : ", alertShown);
    }
  }, [user]);

  // 로그인 화면에서 뒤로가기 했을 때 alertShown 리셋
  useEffect(() => {
    console.log("route?.params?.resetAlert", route?.params?.resetAlert);
    if (route?.params?.resetAlert) {
      setAlertShown(false);
      navigation.setParams({
        resetAlert: undefined
      });
    }
  }, [route?.params?.resetAlert]);

  return(
    <>
      <Drawer.Navigator
        drawerContent={props => <MyCustomDrawer {...props} />}
        initialRouteName="검색"
        screenOptions={({ navigation, route }) => ({
          drawerActiveBackgroundColor: '#E2E2E2',
          drawerActiveTintColor: 'black',
          drawerInactiveTintColor: '#333333',
          drawerLabelStyle: {
            fontSize: 18,  // 폰트 크기 증가
            fontWeight: '500',  // 선택사항: 폰트 두께 추가
          },
          headerStyle: {
            backgroundColor: 'white',
            elevation: 0,            // 안드로이드 그림자 제거
            shadowOpacity: 0,        // iOS 그림자 제거
          },
          headerTintColor: 'black',
          headerTitleAlign: 'center',
          // 커스텀 메뉴 아이콘 추가
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 16 }}
            >
              <Image 
                source={require('../assets/menu.png')} 
                style={{ width: 30, height: 30 }}  // 이미지 크기는 필요에 따라 조절하세요
              />
            </TouchableOpacity>
          ),
          headerRight: () => {
            // 검색 화면일 때만 도움말 아이콘 표시
            if (route.name === "검색") {
              return (
                <TouchableOpacity
                  onPress={() => setIsManualVisible(true)}
                  style={{ marginRight: 16 }}
                >
                  <Image 
                    source={require('../assets/help.png')} // 도움말 아이콘 이미지
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity>
              );
            }
            return null; // 다른 화면에서는 아무것도 표시하지 않음
          },
          drawerStyle: {
            width: '75%',    // 드로어 너비
          },
          overlayColor: 'rgba(0,0,0,0.3)',
          drawerItemStyle: {
            borderRadius: 10,  // 드로어 아이템의 모서리를 각지게
          },
        })}
      >
        <Drawer.Screen
          name="검색"
          component={SearchScreen}
          options={{
            drawerIcon: ({ focused }) => (
              <Image
                source={require("../assets/search.png")}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "black" : "#333333",
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="기록"
          component={HistoryScreen}
          options={{
            headerShown: true,
            drawerIcon: ({ focused }) => (
              <Image
                source={require("../assets/history.png")}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "black" : "#333333",
                }}
              />
            ),
          }}
          listeners={({ navigation }) => ({
            focus: () => {
              console.log("alertShown", alertShown);
              if (!user && !alertShown) {
                setAlertShown(true);
                Alert.alert("로그인 필요", "로그인 시 이용 가능합니다!", [
                  {
                    text: "확인",
                    onPress: () =>
                      navigation.navigate("계정", {
                        fromAlert: true,
                        returnScreen: "검색",
                      }),
                  },
                ]);
              }
            },
          })}
        />
      </Drawer.Navigator>
      <Manual
        visible={isManualVisible}
        onClose={() => setIsManualVisible(false)}
      />
    </>
  );
}

export default DrawerNavigator;