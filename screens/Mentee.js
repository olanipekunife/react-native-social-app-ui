import React from 'react';
import { ScrollView, StyleSheet, View, ImageBackground, NativeModulesStatic, Modal, ActivityIndicator, Platform, TouchableOpacity, Image } from 'react-native';
import { Text as Ntext, ListItem, Left, Right, Radio, Card, CardItem, Body, Textarea, Button, DeckSwiper, Content } from 'native-base';
import { Header } from 'react-navigation';

import { Icon, ImagePicker } from 'expo';
import ProfileCards from '../components/ProfileCards';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../constants/Colors';
import { Bitmoji } from '../components/Bitmoji';

import { Text } from '../components/Text';
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
export default class Mentee extends React.Component {
  // static navigationOptions = {
  //   header: null,
  // };
  // static navigationOptions = ({ navigation }) => ({
  //   headerTitle: 'Pick a Lane',
  //   headerStyle: {
  //     backgroundColor: Colors.noticeText,
  //     elevation: 0, 
  //   },
  //   headerTintColor: Colors.sky2,
  //   headerTitleStyle: {
  //     fontFamily: 'gibson',
  //     fontWeight: 'normal',
  //   },
  // });
  state = { choice: null, showmore: false, photos: [], imageBrowserOpen: false, mentor: false, mentee: false }
  topic = async () => {
    this.setState({ showmore: true });
  }
  pickimage = async () => {
    this.setState({ imageBrowserOpen: true });
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images'
    });
    this.setState({ imageBrowserOpen: false });
    console.log(result);
  }
  setChoice = (choice) => {
    this.setState({ choice });
  }
  render() {
    // if (this.state.choice) {
    //   return <ProfileCards type={this.state.choice} emptyChoice={this.setChoice} />;
    // }
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: Header.HEIGHT - 20, textAlign: 'center', color: Colors.sky, fontSize: 20 }}>Pick your Frensei</Text>

        {/* <TouchableOpacity style={{ flex: 0.425, paddingHorizontal: 20, marginTop: 30 }} onPress={() => this.setState({ mentor: !this.state.mentor })}> */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center', height: 300  }} >
        <View style={{ alignSelf:'center',width:'100%',height:230,backgroundColor:'#ccc' }} />
        </View>
        <View style={{ flex: 0.8 }}>
        <DeckSwiper
        style={{ flex: 1 }}
         ref={(c) => { this._deckSwiper = c; }}
          looping
          onSwipeLeft={(e) => { console.log(e, 'left'); }}
          onSwipeRight={(e) => {
            // const newstate = { ...this.state };
            // const sc = newstate.cards.filter(item => e.image != item.image);
            // console.log(sc);
            // this.setState({ cards: });
            // console.log(this.state);
//  Alert.alert(
//             'Request Sent',
//             'Connection Request Sent Successfully to the Sensei'
//           ); 
}}
            dataSource={cards}
            renderEmpty={() =>
              <View style={{ alignSelf: 'center' }}>
                <Text>Over</Text>
              </View>}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                {/* elevation: 3  */}
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={item.image} />
                </CardItem>
              </Card>
            }
        />
         </View>
         <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center', height: 300  }} >
        <View style={{ alignSelf:'center',width:'100%',height:230,backgroundColor:'#ccc' }} />
        </View>
 
        </View> 
         <View style={{ flexDirection: 'row', flex: 1, position: 'absolute', bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
          <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
       
            <Text>Swipe Left</Text>
          </Button>
          <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            <Text>Swipe Right</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#DF001D',
    opacity: 0.5
  },
  title: {
    fontSize: 17,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center'

  },
});
