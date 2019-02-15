import React from 'react';
import { ScrollView, StyleSheet, View, ImageBackground, NativeModulesStatic, Modal, ActivityIndicator, Platform, TouchableOpacity, Image, AsyncStorage, ToastAndroid, TouchableHighlight } from 'react-native';
import { Text as Ntext, ListItem, Left, Right, Radio, Card, CardItem, Body, Textarea, Button, DeckSwiper, Content, List } from 'native-base';
import { Header } from 'react-navigation';
import Micon from '../components/Micon';
import { Icon } from 'expo';
import Colors from '../constants/Colors';
import { Bitmoji } from '../components/Bitmoji';
import Layout from '../constants/Layout';
import axios from 'axios';
import { Text } from '../components/Text';
import Ip from '../constants/Ip';
import Swipeable from 'react-native-swipeable';

const leftContent = <Text>Pull to activate</Text>;


const rightButtons = [
  <Button info>
    <Micon name='message-outline' color='#fff' />
  </Button>,
  <Button transparent >
    <Micon name='delete-outline' />
  </Button>
];

export default class Requests extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = { mentors: { requests: [] }, isSwiping: false, connections: [], userid: '' }
  componentDidMount = async () => {
//     try {
//        const daata = await axios({
//       url: `${Ip.ip}/user/09030841956/hdbd`,
//       method: 'get'
//     });
// console.log(daata.data);
//   await AsyncStorage.removeItem('user');
//   await AsyncStorage.setItem('user', JSON.stringify(daata.data));
//   const b = await AsyncStorage.getItem('user');
//   console.log(b);
//     } catch (error) {
//       console.log(error.response);
//     }
   
//     return;
    const stat = JSON.parse(await AsyncStorage.getItem('user'));


    const { data } = await axios({
      url: `${Ip.ip}/mentor/${stat._id}`,
      method: 'get'
    });
    console.log('requests', data);
  
    const d = await axios({
      url: `${Ip.ip}/user/${stat._id}`,
      method: 'get'
    });
    console.log('connections', d.data.connections);
    this.setState({ mentors: data, userid: stat._id, load: false, moji: stat.moji, connections: d.data.connections });
  }
  connect = async (userid) => {
    ToastAndroid.show('Connecting....', ToastAndroid.SHORT);
    const dataa = await axios({
      url: `${Ip.ip}/connect`,
      method: 'post',
      data: { userid: this.state.userid, connecting: userid }
    });
    ToastAndroid.show('Connected', ToastAndroid.SHORT);

    const { data } = await axios({
      url: `${Ip.ip}/mentor/${this.state.userid}`,
      method: 'get'
    });
    const d = await axios({
      url: `${Ip.ip}/user/${this.state.userid}`,
      method: 'get'
    });
    this.setState({ mentors: data, connections: d.data.connections });
  }
  disconnect = async (userid) => {
    ToastAndroid.show('Disconnecting....', ToastAndroid.SHORT);

    const dataa = await axios({
      url: `${Ip.ip}/disconnect`,
      method: 'post',
      data: { userid: this.state.userid, connecting: userid }
    });
    ToastAndroid.show('Disconnected', ToastAndroid.SHORT);

    const { data } = await axios({
      url: `${Ip.ip}/mentor/${this.state.userid}`,
      method: 'get'
    });
    const d = await axios({
      url: `${Ip.ip}/user/${this.state.userid}`,
      method: 'get'
    });
    this.setState({ mentors: data, connections: d.data.connections });
  }
  chat = (userid, name, moji) => {
    this.props.navigation.navigate('Chat', { userid, name, moji });
  }
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

  render() {
    // if (this.state.choice) {
    //   return <ProfileCards type={this.state.choice} emptyChoice={this.setChoice} />;
    // }
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: Header.HEIGHT - 20, marginBottom: 15, textAlign: 'center', color: Colors.sky, fontSize: 20 }}>They Want You! Have Your Pick!</Text>
        <ScrollView style={styles.container} scrollEnabled={!this.state.isSwiping}>

          {(typeof this.state.mentors === 'object' && this.state.mentors.requests.length > 0) && this.state.mentors.requests.map((item, i) => (
            <Swipeable
              rightButtonContainerStyle={{ paddingTop: 20 }}
              key={i}
              onRef={ref => this.swipeable = ref}
              onSwipeStart={() => this.setState({ isSwiping: true })}
              onSwipeRelease={() => this.setState({ isSwiping: false })} rightButtonWidth={60} rightActionActivationDistance={110} rightButtons={[
                <Button style={{ backgroundColor: Colors.sky, padding: 10, borderRadius: 8 }} onPress={() => { this.state.connections.filter(itemm => ('user' in itemm ? itemm.user._id.includes(item.userid._id) : false)).length < 1 ? this.connect(item.userid._id) : this.chat(item.userid._id, item.userid.name, item.userid.moji); }}>
                  <Micon name='comment-outline' color='#fff' />
                </Button>,
                <Button danger style={{ padding: 10, borderRadius: 8 }} onPress={() => this.disconnect(item.userid._id)}>
                  <Micon name='account-remove-outline' color='#fff' />
                  {/* <Text>Pub</Text> */}
                </Button>
              ]}
            >
              <CardItem>
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
                    <Image style={{ flex: 1 }} resizeMode='contain' source={{ uri: item.userid.moji }} />
                  </TouchableOpacity>
                  <Body>
                    <Text style={{ marginRight: 0 }}>{item.userid.name}</Text>
                    <Text style={{ marginRight: 0 }} note>{item.userid.category}</Text>
                  </Body>
                </Left>
                <Right>
                  {/* <Text>{console.log(this.state.connections.filter(itemm => ('user' in itemm ? itemm.user._id.includes(item.userid._id) : false)))}</Text> */}
                  <Icon.Entypo
                    name='dot-single'
                    size={50}
                    color={this.state.connections.filter(itemm => ('user' in itemm ? itemm.user._id.includes(item.userid._id) : false)).length > 0 ? Colors.tabIconSelected : Colors.tabIconDefault}
                  />
                </Right>
              </CardItem>
            </Swipeable>
          ))}


        </ScrollView>
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
