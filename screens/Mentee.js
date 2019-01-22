import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import { Header } from 'react-navigation';
import { Container, Content, List, Fab, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Button, Icon, Tabs, Tab , TabHeading, } from 'native-base';
import About from '../components/About';
import Connections from '../components/Connections';
import Posts from '../components/Posts';

import { Text } from '../components/Text';
import Micon from '../components/Micon';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import Colors from '../constants/Colors';
import { Bitmoji } from '../components/Bitmoji';
export default class Mentee extends Component {
  render() {
    return (
      <View />
    );
  }
}
