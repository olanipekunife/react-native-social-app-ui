import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  AsyncStorage,
  Modal,
  ActivityIndicator,
  Alert,
  ImageBackground
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { WebBrowser } from 'expo';
import { Container, Header, Content, List, Fab, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Button, Icon, Tabs, Tab, Title, Footer, Input, Item, FooterTab } from 'native-base';
import { Bitmoji } from '../components/Bitmoji';
import Colors from '../constants/Colors';
import Micon from '../components/Micon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import axios from 'axios';
import { Text } from '../components/Text';
import Ip from '../constants/Ip';
import moment from 'moment';
const json = require('../assets/categories.json');

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'News Feed',
    headerStyle: {
      backgroundColor: Colors.noticeText,
      elevation: 0,
    },
    headerTintColor: Colors.sky2,
    headerTitleStyle: {
      fontFamily: 'gibson',
      fontWeight: 'normal',
    },
    // headerRight: (
    //   <TouchableOpacity
    //     onPress={() => alert('search!')}
    //     style={{ marginRight: 20 }}
    //   >
    //     <Micon name='find-replace' />
    //   </TouchableOpacity>
    // ),

  });
  state = {
    active: false,
    moji: 'https://via.placeholder.com/100',
    posts: [],
    comment: null,
    usercomment: '',
    userid: '',
    load: false
  }
  async componentDidMount() {
    this.setState({ load: true });
//         try {
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


    axios({
      url: `${Ip.ip}/post`,
      method: 'get'
    }).then(async ({ data }) => {
      console.log(data);
      this.setState({ posts: data, userid: stat._id, load: false, moji: stat.moji });
    }).catch(err => {
      console.log(err);
    });
    //navigation.getParam('itemId', 'NO-ID');
  }
  renderItem = ({ item }) => (
    <ListItem avatar>

      <Thumbnail source={{ uri: item.image }} />

    </ListItem>
  );
  time = (createdAt) => {
    if (moment().diff(moment(createdAt), 'minutes') <= 60) {
      if (moment().diff(moment(createdAt), 'minutes') === 1) {
        return `${moment().diff(moment(createdAt), 'minutes')} min ago`;
      }
      return `${moment().diff(moment(createdAt), 'minutes')} mins ago`;
    } else if (moment().diff(moment(createdAt), 'hours') <= 24) {
      if (moment().diff(moment(createdAt), 'hours') === 1) {
        return `${moment().diff(moment(createdAt), 'hours')} hour ago`;
      }
      return `${moment().diff(moment(createdAt), 'hours')} hours ago`;
    }
    if (moment().diff(moment(createdAt), 'days') === 1) {
      return `${moment().diff(moment(createdAt), 'days')} day ago`;
    }
    return `${moment().diff(moment(createdAt), 'days')} days ago`;
  }
  comment = (postid) => {
    console.log(this.state.userid);
    this.setState({ load: true });
    axios({
      url: `${Ip.ip}/comment`,
      method: 'post',
      data: { postid, userid: this.state.userid, comment: this.state.usercomment }
    }).then(async ({ data }) => {
      axios({
        url: `${Ip.ip}/post`,
        method: 'get'
      }).then(async ({ data }) => {
        this.setState({ posts: data, load: false });

        console.log(data);
      }).catch(err => {
        console.log(err.response);
      });
      // this.setState({ posts: data, load: false });
    }).catch(err => {
      console.log(err.response);
    });
  }
  like = (postid) => {
    console.log(this.state.userid);
    this.setState({ load: true });
    axios({
      url: `${Ip.ip}/like`,
      method: 'post',
      data: { postid, userid: this.state.userid }
    }).then(async ({ data }) => {
      axios({
        url: `${Ip.ip}/post`,
        method: 'get'
      }).then(async ({ data }) => {
        this.setState({ posts: data, load: false });

        console.log(data);
      }).catch(err => {
        console.log(err.response);
      });
      // this.setState({ posts: data, load: false });
    }).catch(err => {
      console.log(err.response);
    });
  }
  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%'
      }}
    />
  );
  render() {
    return (
      <View style={styles.container}>


        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {/* <List>
        <ListItem itemHeader style={{ paddingBottom: 10 }}>
              <Text>CATEGORIES</Text>
            </ListItem>
        <FlatList
          data={json}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
           ItemSeparatorComponent={this.renderSeparator}
        />
      </List> */}

          <Tabs tabContainerStyle={{ backgroundColor: Colors.noticeText, elevation: 0, borderBottomWidth: 1, borderBottomColor: '#ccc' }} tabBarUnderlineStyle={{ borderBottomWidth: 1, backgroundColor: Colors.noticeText, borderBottomColor: Colors.sky }} locked >

            <Tab style={{ paddingTop: 10 }} tabStyle={{ backgroundColor: Colors.noticeText }} textStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson' }} activeTabStyle={{ backgroundColor: Colors.noticeText }} activeTextStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson' }} heading="Music">
              <View style={styles.welcomeContainer}>
                {this.state.posts.map((item, i) => (
                  <Card key={item._id} style={{ zIndex: 0, marginTop: 20 }}>

                    <TouchableOpacity
                      onPress={() => {
                        item.likes.filter(itemm => itemm.userid.includes(this.state.userid)).length !== 3 ? this.props.navigation.navigate('Profile', { user: item.user._id, moji: item.user.moji, pic: item.user.pic, userCountry: item.user.userCountry, name: item.user.name, headline: item.user.headline, bio: item.user.bio }) : Alert.alert(
                          'You cannot View this Profile',
                          'Please like this user post 3 times to unlock')
                          ;
                      }} style={{
                        position: 'absolute',
                        top: -20,
                        left: -15,
                        width: 40,
                        height: 50,
                        zIndex: 1,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        backgroundColor: '#ccc'
                      }}
                    >
                     <Animatable.Image
style={{ flex: 1 }} source={{ uri: item.user.moji }} animation='bounce' duration={1000} delay={1000}
                     />
                    </TouchableOpacity>
                    {/*    <CardItem style={{ }}>
<Body>
<Text>Joshua</Text>
<Text note>Mentor</Text>

</Body>
</CardItem> */}
                    <CardItem style={{ height: 290, flex: 1 }} cardBody>
                  
                      <Image source={{ uri: item.media }} resizeMode='stretch' style={{ height: 290, width: null, flex: 1, alignSelf: 'stretch' }} />
                    </CardItem>

                    <CardItem style={{ paddingBottom: 0 }}>
                      <Left>
                        {this.state.load ?
                          <Button transparent >
                            <ActivityIndicator style={{ alignSelf: 'center', textAlign: 'center' }} size="small" color='#000' />
                          </Button>
                          : <Button transparent onPress={() => this.like(item._id)}>
                            <Micon name='heart' size={20} color={item.likes.filter(iteem => iteem.userid.includes(this.state.userid)).length < 1 ? Colors.tabIconDefault : Colors.tabIconSelected} />
                            <Text style={{ color: Colors.tabIconSelected, paddingLeft: 5 }}>{item.likes.length}</Text>
                          </Button>}

                        <Button transparent onPress={() => { this.setState({ comment: item._id }); }}>
                          {/* <Micon size={18} name='comment-outline'  /> */}
                          <Text style={{ color: Colors.tabIconSelected, paddingLeft: 0 }}>View {item.comments.length} Comments</Text>
                        </Button>
                        <Modal
                          animationType="slide"
                          transparent={false}
                          visible={this.state.comment === item._id}
                          onRequestClose={() => {
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <Header style={{ backgroundColor: '#fff' }}>
                              <Left>
                                <Button transparent onPress={() => this.setState({ comment: null })}>
                                  <Micon color='#000' name='keyboard-backspace' />
                                </Button>
                              </Left>
                              <Body>
                                <Title style={{ color: '#000' }}>Comments</Title>
                              </Body>

                            </Header>
                            <ScrollView>
                              <ListItem avatar>
                                <Left>
                                  <Thumbnail small resizeMode='contain' source={{ uri: item.user.moji }} />
                                </Left>
                                <Body>
                                  <Text>{item.user.name}</Text>
                                  <Text note>{item.text}</Text>
                                </Body>
                                <Right>
                                  <Text note>{this.time(item.createdAt)}</Text>
                                </Right>
                              </ListItem>
                              <List>
                                {item.comments.map(comment => (
                                  <ListItem avatar key={comment._id} style={{ borderColor: 'transparent' }}>
                                    <Left>
                                      <Thumbnail small resizeMode='contain' source={{ uri: comment.userid.moji }} />
                                    </Left>
                                    <Body style={{ borderColor: 'transparent' }}>
                                      <Text>{comment.userid.name}</Text>
                                      <Text note>{comment.comment}</Text>
                                    </Body>

                                  </ListItem>

                                ))}
                              </List>
                            </ScrollView>
                            {/* <View style={{ }}> */}

                            <Item style={{ position: 'absolute', bottom: 0, paddingHorizontal: 5 }}>
                              <Thumbnail small resizeMode='contain' source={{ uri: this.state.moji }} />

                              <Input editable={!this.state.load} onChangeText={(usercomment) => this.setState({ usercomment })} value={this.state.usercomment} style={{ fontFamily: 'gibson', fontSize: 13 }} returnKeyType='send' onSubmitEditing={() => { this.comment(item._id); }} placeholder='Add a Comment' />
                              {this.state.load ?
                                <ActivityIndicator style={{ alignSelf: 'center', textAlign: 'center' }} size="small" color='#000' />
                                : <Button transparent onPress={() => this.comment(item._id)}>
                                  <Micon color='#000' name='send' />
                                </Button>}

                            </Item>

                          </View>
                          {/* </View> */}
                        </Modal>
                      </Left>
                      <Right>
                        <Text note>{this.time(item.createdAt)}</Text>
                      </Right>

                    </CardItem>
                    <CardItem style={{ paddingTop: 0 }}>
                      <Body>
                        <Text style={{ lineHeight: 18, fontSize: 14 }}>
                          {item.text}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>

                ))}


              </View>
            </Tab>
            <Tab tabStyle={{ backgroundColor: Colors.noticeText }} textStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson' }} activeTabStyle={{ backgroundColor: Colors.noticeText }} activeTextStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson' }} heading="Spanish">
              {/* <Tab3 /> */}
            </Tab>
            <Tab tabStyle={{ backgroundColor: Colors.noticeText }} textStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson' }} activeTabStyle={{ backgroundColor: Colors.noticeText }} activeTextStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson' }} heading="Photography">
              {/* <Tab3 /> */}
            </Tab>
          </Tabs>


          {/* </View> */}

        </ScrollView>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: Colors.sky, opacity: 0.8 }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('News', { name: 'Joshua', uri: this.state.bitmoji })}
        >
          <Micon name="square-edit-outline" />
          {/* <Button style={{ backgroundColor: '#992c39' }} onPress={() => this.props.navigation.navigate('News', { name: 'Joshua', uri: this.state.bitmoji })}>
            <Icon name="md-paper" />
          </Button> */}

        </Fab>
      </View>


    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    }
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode, your app will run at full speed.
        </Text>
    );
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    // paddingTop: 20,
  },
  welcomeContainer: {
    flex: 1,
    // marginVertical: 5,
    paddingHorizontal: 15
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
