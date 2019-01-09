import React from 'react';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import Getstarted from '../screens/Getstarted';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';

const AppStack = createStackNavigator({ 
  Getstarted: {
    screen: Getstarted,
  navigationOptions: {
    header: null,
  } }, 
  Signin: {
    screen: Signin
  }, 
  Signup: {
    screen: Signup }
});

export default createSwitchNavigator({
  App: AppStack,
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
},
{
  initialRouteName: 'App',
}
);
