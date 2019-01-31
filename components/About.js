import React, { Component } from 'react';
import { Image, View, Alert, AsyncStorage } from 'react-native';
import { Container, Header, DeckSwiper, Title, Right, Card, Toast, CardItem, Thumbnail, Left, Body, Button, Content } from 'native-base';
import { Bitmoji } from '../components/Bitmoji';
import { Text } from '../components/Text';


export default class About extends Component {
  state = { cards: [], bio: '', head: '' }
 async componentDidMount() {
  let user = await AsyncStorage.getItem('user');
  user = JSON.parse(user);
  this.setState({ bio: user.bio, head: user.headline });
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
        <View style={{ flex: 1, marginTop: 20 }}>
     <Text style={{ fontSize: 20, marginBottom: 10, color: '#49556c', lineHeight: 24 }}>{this.state.head}</Text>
<Text style={{ color: '#777e8a', lineHeight: 24 }}>{this.state.bio}</Text>
      </View>
    );
  }
}
