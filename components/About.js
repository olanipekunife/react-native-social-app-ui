import React, { Component } from 'react';
import { Image, View, Alert } from 'react-native';
import { Container, Header, DeckSwiper, Title, Right, Card, Toast, CardItem, Thumbnail, Left, Body, Button, Content } from 'native-base';
import { Bitmoji } from '../components/Bitmoji';
import { Text } from '../components/Text';


export default class About extends Component {
  state = { cards: [] }
 componentDidMount() {
  const cards = [
    {
      text: 'I have been trying to play the guitar for 1 year. I need motivation and consistent guidance. I want to get better really quickly. I am a mature beginner',
      name: 'Angelina Costa',
      image: require('../assets/images/carde.jpeg'),
      thumbnail: Bitmoji()
    },
    {
        text: 'I have been trying to play the guitar for 1 year. I need motivation and consistent guidance. I want to get better really quickly. I am a mature beginner',
        name: 'Melinda Jones',
        image: require('../assets/images/cardg.jpeg'),
        thumbnail: Bitmoji()
      },
      {
        text: 'I have been trying to play the guitar for 1 year. I need motivation and consistent guidance. I want to get better really quickly. I am a mature beginner',
        name: 'Julius Berger',
        image: require('../assets/images/cardp.jpeg'),
        thumbnail: Bitmoji()
      },
  ];
  this.setState({ cards });
   
 }
  render() {
    return (
        <View style={{ flex: 1, marginTop:20 }}>
     <Text style={{fontSize: 20, marginBottom:10, color:'#49556c' }}>Sharing my experience with
aspiring photographers</Text>
<Text style={{color:'#777e8a' }}>Hello, my name’s Stephanie Cole. I’m a photographer
from New York, and have been in the industry for
over 6 years. I specialise in landscape</Text>
      </View>
    );
  }
}
