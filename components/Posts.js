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

export default class Posts extends React.Component {
  state = {
    active: false,
    moji: 'https://via.placeholder.com/100',
    posts: [],
    comment: null,
    usercomment: '',
    userid: '',
    load: false
  }
  
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
 
  render() {
    return (
        <View style={styles.welcomeContainer}>
         {this.props.posts.map((item, i) => (
                  <Card key={item._id} style={{ zIndex: 0, marginTop: 20 }}>
  
               
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
                        {<Button transparent>
                            <Micon name='heart' size={20} color={Colors.tabIconDefault} />
                            <Text style={{ color: Colors.tabIconDefault, paddingLeft: 5 }}>{item.likes.length}</Text>
                          </Button>}

                        <Button transparent onPress={() => { this.setState({ comment: item._id }); }}>
                          <Micon size={20} name='comment-outline'   color={Colors.tabIconDefault} />
                          <Text style={{ color: Colors.tabIconDefault, paddingLeft: 0 }}> {item.comments.length}</Text>
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
    );
  }
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
  //  paddingHorizontal: 25
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
