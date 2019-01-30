import React from 'react';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import Getstarted from '../screens/Getstarted';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
import Categories from '../screens/Categories';
import MoreInfo from '../screens/MoreInfo';

const AppStack = createStackNavigator({ 
   Signup: {
    screen: Signup
   },
    Categories,
    MoreInfo,
  Signin: {
    screen: Signin
  }, 
Getstarted: {
  screen: Getstarted,
navigationOptions: {
  header: null,
} }, 

},
{
    initialRouteName: 'Signup',
  }

);

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
