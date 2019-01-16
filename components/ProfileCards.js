import React, { Component } from 'react';
import { Image, View, Alert } from 'react-native';
import { Container, Header, DeckSwiper, Title, Right, Card, Toast, CardItem, Thumbnail, Text, Left, Body, Button, Content } from 'native-base';
import { Icon, Constants } from 'expo';
import { Bitmoji } from '../components/Bitmoji';


export default class ProfileCards extends Component {
  state = { cards: [] }
 componentDidMount() {
  const cards = [
    {
      text: 'Sample text Sample text Sample text Sample text Sample text ',
      name: 'Emotional Intelligence',
      image: require('../assets/images/carde.jpeg'),
      thumbnail: Bitmoji()
    },
    {
        text: 'Sample text Sample text Sample text Sample text Sample text ',
        name: 'Guitar Lessons',
        image: require('../assets/images/cardg.jpg'),
        thumbnail: Bitmoji()
      },
      {
        text: 'Sample text Sample text Sample text Sample text Sample text ',
        name: 'Coding',
        image: require('../assets/images/cardp.jpeg'),
        thumbnail: Bitmoji()
      },
  ];
  this.setState({ cards });
    Toast.show({
      text: 'Swipe Left to Ignore, Swipe Right to Request Connection',
      duration: 6000,
      position: 'bottom',
      type: 'success'
    });
 }
  render() {
    return (
        <Container>
      <Header style={{ paddingTop: Constants.statusBarHeight + 25, paddingBottom: Constants.statusBarHeight, backgroundColor: '#DF001D' }}>
      <Left>
            <Button transparent onPress={() => { this.props.navigation.navigate('Home') ;}}>
            <Icon.Ionicons
        name='md-arrow-back'
        color='#fff'
            />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.type == 'mentee' ? 'Find a Frensei' : 'Pick a mentee'}</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ paddingHorizontal: 10 }}>
        {this.state.cards.length != 0 ? <DeckSwiper
          looping
          onSwipeLeft={(e) => { console.log(e, 'left'); }}
          onSwipeRight={(e) => {
            // const newstate = { ...this.state };
            // const sc = newstate.cards.filter(item => e.image != item.image);
            // console.log(sc);
            // this.setState({ cards: });
            // console.log(this.state);
 Alert.alert(
            'Request Sent',
            'Connection Request Sent Successfully to the Sensei'
          ); 
}}
            dataSource={this.state.cards}
            renderEmpty={() =>
              <View style={{ alignSelf: 'center' }}>
                <Text>Over</Text>
              </View>}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: item.thumbnail }} />
                    <Body>
                      <Text>{item.name}</Text>
                      {/* <Text note></Text> */}
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={item.image} />
                </CardItem>
                <CardItem>
              
                  <Text>{item.text}</Text>
                </CardItem>
              </Card>
            }
        /> : null}
        </View>
        
      </Container>
    );
  }
}
