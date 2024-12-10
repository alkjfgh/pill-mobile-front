import { View, Text, Button } from "react-native";
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import styles from "../style/MainStyle";
import LoginScreen from "./LoginScreen";
import SearchScreen from "./SearchScreen";
import HistoryScreen from "./HistoryScreen";

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator
        drawerContent={props => <MyCustomDrawer {...props} /> } 
        initialRouteName='Main'
        screenOptions = {
          {
            drawerActiveBackgroundColor: '#d2066c',
            drawerActiveTintColor: '#ffffff',
            drawerInactiveTintColor: '#333333',
            headerStyle: {
              backgroundColor: '#d2066c'
            },
            headerTintColor: '#ffffff'
          }
        }
        >
          <Drawer.Screen name='Main' component={Main} />
          <Drawer.Screen name="LoginScreen" component={LoginScreen} />
          <Drawer.Screen name="SearchScreen" component={SearchScreen} />
          <Drawer.Screen name="HistoryScreen" component={HistoryScreen} />

        </Drawer.Navigator>
      </NavigationContainer>
      {/* <LoginScreen />
      <SearchScreen />
      <HistoryScreen /> */}
    </View>
  );
};

export default Main;