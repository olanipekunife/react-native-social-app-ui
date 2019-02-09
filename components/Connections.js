import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity } from 'react-native';

import { Container, Content, List, Fab, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Button, Icon, Tabs, Tab , TabHeading, } from 'native-base';
import { Bitmoji } from '../components/Bitmoji';
import { Text } from '../components/Text';


export default class Connections extends Component {
  state = { cards: [] }
 
  render() {
    return (
        <View style={{}}>
        <CardItem style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Left>
        <TouchableOpacity
             
              style={{
                width: 40,
                height: 50,
                borderWidth: 3,
                borderColor: '#fff',
                borderRadius: 5,
                backgroundColor: '#ccc'
              }}
        >
              <Image style={{ flex: 1 }} resizeMode='contain' source={{ uri: Bitmoji() }} />
            </TouchableOpacity>
            <Body>
                      <Text note style={{ marginRight: 0 }}>Ali Adnan</Text>
                      </Body>
                  </Left>
                  <Right>
                  <Text note >11h ago</Text>
                  </Right>
        </CardItem>
        <CardItem style={{ paddindTop: 0, paddingBottom: 0 }}>
        <Left>
        <TouchableOpacity
             
              style={{
                width: 40,
                height: 50,
                borderWidth: 3,
                borderColor: '#fff',
                borderRadius: 5,
                backgroundColor: '#ccc'
              }}
        >
              <Image style={{ flex: 1 }} resizeMode='contain' source={{ uri: Bitmoji() }} />
            </TouchableOpacity>
            <Body>
                      <Text note style={{ marginRight: 0 }}>Stephen Joshua</Text>
                      </Body>
                  </Left>
                  <Right>
                  <Text note >11h ago</Text>
                  </Right>
        </CardItem>
      </View>
    );
  }
}
