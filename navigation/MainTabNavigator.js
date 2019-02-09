import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import News from '../screens/News';
import Profile from '../screens/Profile';
import Mentor from '../screens/Mentor';
import Mentee from '../screens/Mentee';

import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Requests from '../screens/Requests';

const HomeStack = createStackNavigator({
  Home: HomeScreen,

  
  Profile
});

HomeStack.navigationOptions = {
  tabBarLabel: 'New Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: {
    screen: LinksScreen,
  navigationOptions: {
    header: null,
  } }, 
  Mentor: {
    screen: Mentor,
  navigationOptions: {
    header: null,
  } }, 
  Mentee: {
    screen: Mentee,
  navigationOptions: {
    header: null,
  } }, 
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Frensei',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-reorder' : 'md-reorder'}
    />
  ),
};

const RequestsStack = createStackNavigator({
  Requests
});

RequestsStack.navigationOptions = {
  tabBarLabel: 'Request',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  ),
};
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};
//you can just export this
 const TabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  RequestsStack,
  SettingsStack,
},
{
  tabBarOptions: {
    showLabel: false
}
}
);


export default createStackNavigator({
  TabNavigator: {
    screen: TabNavigator,
  navigationOptions: {
    header: null,
  } }, 
  News,
    /* any other route you want to render above the tab bar */
});
