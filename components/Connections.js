import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity } from 'react-native';

import { Container, Content, List, Fab, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Button, Icon, Tabs, Tab, TabHeading, } from 'native-base';
import { Bitmoji } from '../components/Bitmoji';
import { Text } from '../components/Text';

const Connections = (props) => {
  console.log(props);
  return (
  <View style={{}}>
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
                <Text note >{item.user.userCountry}</Text>
                </Right>
      </CardItem> : null
   
      )) }
      </View>
  );
};

export default Connections;
