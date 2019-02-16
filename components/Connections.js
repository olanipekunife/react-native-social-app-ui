import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity } from 'react-native';

import { Container, Content, List, Fab, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Button, Icon, Tabs, Tab, TabHeading, } from 'native-base';
import { Bitmoji } from '../components/Bitmoji';
import { Text } from '../components/Text';

import Micon from '../components/Micon';
import Colors from '../constants/Colors';
const Connections = (props) => {
  console.log(props);
  const chat = (userid, name, moji) => {
    props.navigation.navigate('Chat', { userid, name, moji });
  };
  return (
  <View style={{ marginTop: 10 }}>
      {props.connects.map((item, i) => (
        'user' in item ? 
        <CardItem key={i} style={{ paddingTop: 0, paddingBottom: 0 }}>
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
            <Image style={{ flex: 1 }} resizeMode='contain' source={{ uri: item.user.moji }} />
          </TouchableOpacity>
          <Body>
                    <Text note style={{ marginRight: 0 }}>{item.user.name}</Text>
                    </Body>
                </Left>
                <Right>
               <Button transparent icon onPress={() => { chat(item.user._id, item.user.name, item.user.moji); }}>
                  <Micon name='comment-outline' size={18} color='#000' />
                </Button>
                </Right>
      </CardItem> : null
   
      )) }
      </View>
  );
};

export default Connections;
