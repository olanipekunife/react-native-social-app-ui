import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container, Header, DeckSwiper, Title, Right, Card, Toast, CardItem, Thumbnail, Text, Left, Body, Button } from 'native-base';
import { Icon, Constants } from 'expo';
const cards = [
    {
      text: 'Card two',
      name: 'One',
      image: require('../assets/images/frensei.jpeg'),
    },
    {
        text: 'Card One',
        name: 'One',
        image: require('../assets/images/mentor.jpeg'),
      },
      {
        text: 'Card three',
        name: 'One',
        image: require('../assets/images/onboard.jpg'),
      },
  ];
export default class ProfileCards extends Component {
 componentDidMount() {
    Toast.show({
      text: 'Swipe Left to Ignore, Swipe Right to Request',
      duration: 6000,
      position: 'bottom',
      type: 'success'
    });
 }
  render() {
    return (
        <Container>
      <Header style={{ paddingTop: Constants.statusBarHeight + 25, paddingBottom: Constants.statusBarHeight, backgroundColor: '#DF001D' }}>
          <Body>
            <Title>Pick a {this.props.type == 'mentor' ? 'Frensei' : 'mentee'}</Title>
          </Body>
          <Right />
        </Header>
        <View>
          <DeckSwiper
          looping={false}
          onSwipeLeft={(e) => { console.log(e.text, 'left'); }}
          onSwipeRight={(e) => { console.log(e.text, 'right'); }}
            dataSource={cards}
            renderEmpty={() =>
              <View style={{ alignSelf: 'center' }}>
                <Text>Over</Text>
              </View>}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                      <Text>{item.text}</Text>
                      <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={item.image} />
                </CardItem>
                <CardItem>
                <Icon.Ionicons
            name="md-heart" color='#ED4A6A' 
                />  
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            }
          />
        </View>
        
      </Container>
    );
  }
}
