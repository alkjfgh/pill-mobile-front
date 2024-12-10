import React from "react";
import { Text, View, ImageBackground, Image} from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Ionicons } from '@expo/vector-icons';

const MyCustomDrawer = props => {
    return(
        <View style={{flex:1}}>
            {/* Header */}
            <ImageBackground source={require('../assets/Home.jpg')} style={{paddingTop: 20, paddingBottom: 5}}>
            
            {/* circular Profile Picture _starts */}
            <View style={{justifyContent:'center', alignItems: 'center'}}>
                <View style={{borderColor: '#fff', borderWidth: 0, borderRadius: 43}}>
                    <Image source={require('../assets/common.jpg')} style={{Width: 80, height: 100, borderRadius: 30}} />
                </View>
            </View>
            {/* circular Profile Picture _ends */}
            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
                <Text style={{fontSize: 14, color: '#000000',}}>USER</Text>
            </View>
            
            </ImageBackground>

            {/* The navigation  */}
           <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
           </DrawerContentScrollView>

            {/* Footer */}
           <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#cccccc'}}>

           <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 15}}>
            <Ionicons name="share-social-outline" size={22} color="#d2066c"/>
            <Text style={{color: '#d2066c', fontSize: 15, marginLeft: 5}}>공유하기</Text>
           </View>


           <View style={{flexDirection: 'row', alignItems: 'center',  paddingVertical: 15}}>
            <Ionicons name="share-social-outline" size={22} color="#d2066c"/>
            <Text style={{color: '#d2066c', fontSize: 15, marginLeft: 5}}>Sing Out</Text>
           </View>
        </View>
        </View>
    );
}

export default MyCustomDrawer;