import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Login from '../screens/Login';

import {Image} from 'react-native';
import Search from '../screens/Search';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: hp('8%'),
          justifyContent: 'center',

          backgroundColor: '#FEFEFE',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Image
              resizeMode="contain"
              source={require('../images/home.png')}
              style={{height: hp('4%'), width: wp('7%')}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Image
              resizeMode="contain"
              source={require('../images/search.png')}
              style={{height: hp('4%'), width: wp('7%')}}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Rate"
        component={Search}
        options={{
          tabBarLabel:"",
          tabBarIcon: ({color, size}) => (
            <Image
            resizeMode="contain"
              source={require('../images/star.png')}
              style={{height: hp('4%'), width: wp('7%')}}
            />
          ),
        }}
      />
       <Tab.Screen
        name="Profile"
        component={Search}
        options={{
          tabBarLabel:"",
          tabBarIcon: ({color, size}) => (
            <Image
            resizeMode="contain"
              source={require('../images/user.png')}
              style={{height: hp('4%'), width: wp('7%')}}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      {/* <Stack.Screen name="Login" component={Login} /> */}
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
