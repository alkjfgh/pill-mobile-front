import React from "react";
import { Text, View, Image, Alert, DevSettings } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import styles from "../style/MyCustomDrawerStyle";
import useGetGoogleAuth from "../auth/useGetGoogleAuth";
// import { Ionicons } from '@expo/vector-icons';
import SettingScreen from './../screens/SettingScreen';

const MyCustomDrawer = props => {
    const { user, handleLogout } = useGetGoogleAuth();
    const navigation = props.navigation;

    const handleLogoutPress = () => {
        Alert.alert(
            "로그아웃",
            "정말 로그아웃하시겠습니까?",
            [
                {
                    text: "취소",
                    style: "cancel"
                },
                {
                    text: "확인",
                    onPress: async () => {
                        await handleLogout();
                        DevSettings.reload();  // 앱 재시작
                        console.log("앱 재시작");
                    }
                }
            ]
        );
    };

    return(
        <View style={styles.container}>
            {/* Header */}
            <View style={user?.photoURL ? styles.profilePictureContainer : styles.defaultPictureContainer}>
                <View style={styles.profilePictureView}>
                    <Image source={user?.photoURL ? {uri: user.photoURL} : require('../assets/logo.png')} style={styles.profilePicture} />
                </View>
            </View>

            <View style={styles.profileTextView}>
                <Text style={styles.profileText}>{user?.displayName || '비회원'}</Text>
            </View>

            {/* 로그인한 경우에만 이메일 표시 */}
            {user?.email && (
                <View style={styles.profileTextView}>
                    <Text style={styles.profileText}>{user.email}</Text>
                </View>
            )}

            {/* The navigation  */}
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            {/* Footer */}
            <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#cccccc'}}>

                <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 15}}>
                    <Text onPress={() => navigation.navigate('SettingScreen')} style={{color: '#d2066c', fontSize: 15, marginLeft: 5}}>설정</Text>
                </View>


                {user && (
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 15}}>
                        <Text 
                            onPress={handleLogoutPress}
                            style={{color: '#d2066c', fontSize: 15, marginLeft: 5}}
                        >
                            로그아웃
                        </Text>
                    </View>
                )}

            </View>
        </View>
    );
}

export default MyCustomDrawer;