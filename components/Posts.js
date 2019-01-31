import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity } from 'react-native';

import { Container, Content, List, Fab, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Button, Icon, Tabs, Tab, TabHeading, } from 'native-base';
import { Bitmoji } from '../components/Bitmoji';
import { Text } from '../components/Text';
import Micon from '../components/Micon';
import Colors from '../constants/Colors';

export default class Posts extends Component {
  state = { cards: [] }
 
  render() {
    return (
        <View style={styles.welcomeContainer}>
        <Card style={{ }}>
        
      
          <CardItem cardBody>
            <Image source={require('../assets/images/new1.jpg')} style={{ height: 290, width: null, flex: 1 }} />
          </CardItem>
    
          <CardItem style={{ paddingBottom: 0 }}>
            <Left>
              <Button transparent>
              <Micon name='heart' size={18} color={Colors.tabIconSelected} />
                <Text style={{ color: Colors.tabIconSelected, paddingLeft: 5 }}>12</Text>
              </Button>
              <Button transparent>
              <Micon size={18} name='comment-outline' color={Colors.tabIconSelected} />
                {/* <Text>100 Comments</Text> */}
              </Button>
             
            </Left>
            <Right>
    <Text note>11h ago</Text>
            </Right>
    
          </CardItem>
          <CardItem style={{ paddingTop: 0 }}>
            <Body>
              <Text style={{ lineHeight: 18, fontSize: 14, textAlign: 'justify' }}>
              When you don't create things, you become defined by your tastes rather than ability. Expert dont walk around around claiming to be experts
    </Text>
            </Body>
          </CardItem>
        </Card>
        <Card style={{ }}>
        
      
        <CardItem cardBody>
          <Image source={require('../assets/images/news.jpeg')} style={{ height: 290, width: null, flex: 1 }} />
        </CardItem>
  
        <CardItem style={{ paddingBottom: 0 }}>
          <Left>
            <Button transparent>
            <Micon name='heart' size={18} color={Colors.tabIconSelected} />
              <Text style={{ color: Colors.tabIconSelected, paddingLeft: 5 }}>12</Text>
            </Button>
            <Button transparent>
            <Micon size={18} name='comment-outline' color={Colors.tabIconSelected} />
              {/* <Text>100 Comments</Text> */}
            </Button>
           
          </Left>
          <Right>
  <Text note>11h ago</Text>
          </Right>
  
        </CardItem>
        <CardItem style={{ paddingTop: 0 }}>
          <Body>
            <Text style={{ lineHeight: 18, fontSize: 14 }}>
            When you don't create things, you become defined by your tastes rather than ability. Expert dont walk around around claiming to be experts
  </Text>
          </Body>
        </CardItem>
      </Card>
      </View>
    );
  }
}
const styles = StyleSheet.create({
welcomeContainer: {
    flex: 1,
    marginVertical: 15,
   // paddingHorizontal: 25
  },
});
