import React from "react";
import { Text, View, Image, Alert, DevSettings } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import styles from "../style/MyCustomDrawerStyle";
import useGetGoogleAuth from "../auth/useGetGoogleAuth";

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
                        // DevSettings.reload();  // 앱 재시작
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "메뉴" }], // 앱의 첫 화면으로 이동 apk 빌드용
                        });
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

            {/* 로그인한 경우에만 이메일 표시 */}
            {user?.email && (
                <>
                    <View style={styles.profileTextView}>
                        <Text style={styles.profileText}>{user.displayName}</Text>
                    </View>
                    <View style={styles.profileTextView}>
                        <Text style={styles.profileText}>{user.email}</Text>
                        <View style={styles.divider} />
                    </View>
                    <View style={styles.divider} />
                </>
            )}

            {/* <View style={styles.divider} /> */}

            {/* The navigation  */}
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} style={styles.drawerItemList} />
            </DrawerContentScrollView>

            {/* Footer */}
            <View style={styles.footerContainer}>
                <View style={styles.menuItemContainer}>
                    <Text 
                        onPress={() => navigation.navigate('SettingScreen')} 
                        style={styles.menuItemText}
                    >
                        설정
                    </Text>
                </View>

                {user && (
                    <View style={styles.menuItemContainer}>
                        <Text 
                            onPress={handleLogoutPress}
                            style={styles.menuItemText}
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