import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './../screens/HomeScreen';
import HomeStack from './HomeStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import {NavigationContainer} from '@react-navigation/native';

function Profile({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function Setting({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
function Logout({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function AppStack() {
  return (
    // <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          // backgroundColor: '#c6cbef', //Set Drawer background
          width: 250, //Set Drawer width
        },
        headerStyle: {
          // backgroundColor: '#fdc901',
          backgroundColor: '#016153', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-sharp" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="logout" size={22} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Moments"
        component={MomentsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="timer-outline" size={22} color={color} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
    // </NavigationContainer>
  );
}
