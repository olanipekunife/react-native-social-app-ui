import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';
import { Container, Header, Content, List, Fab, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Button, Icon, Tabs, Tab } from 'native-base';
import { Bitmoji } from '../components/Bitmoji';
import Colors from '../constants/Colors';
import Micon from '../components/Micon';

import { Text } from '../components/Text';
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
    headerRight: (
      <TouchableOpacity
        onPress={() => alert('search!')}
        style={{ marginRight: 20 }}
      >
        <Micon name='find-replace' />
      </TouchableOpacity>
    ),

  });
  state = {
    active: false,
    bitmoji: 'https://via.placeholder.com/100'
  }
  async componentDidMount() {
    const stat = await AsyncStorage.getItem('state');
    console.log(stat);
    this.setState({ bitmoji: JSON.parse(stat).moji });
    console.log(JSON.parse(stat).moji);
    //navigation.getParam('itemId', 'NO-ID');
  }
  renderItem = ({ item }) => (
    <ListItem avatar>

      <Thumbnail source={{ uri: item.image }} />

    </ListItem>
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
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </List> */}

          <Tabs tabContainerStyle={{ backgroundColor: Colors.noticeText, elevation: 0, borderBottomWidth: 1, borderBottomColor: '#ccc' }} tabBarUnderlineStyle={{ borderBottomWidth: 1, backgroundColor: Colors.noticeText, borderBottomColor: Colors.sky }} locked >

            <Tab style={{ paddingTop: 20 }} tabStyle={{ backgroundColor: Colors.noticeText }} textStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson' }} activeTabStyle={{ backgroundColor: Colors.noticeText }} activeTextStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson' }} heading="Music">
              <View style={styles.welcomeContainer}>
                <Card style={{ zIndex: 0 }}>
                
                <TouchableOpacity
onPress={() => { this.props.navigation.navigate('Profile'); }} style={{ position: 'absolute',
top: -20,
left: -15,
width: 40,
height: 50,
zIndex: 1,
borderWidth: 1,
    borderColor: '#ccc', 
borderRadius: 5,
backgroundColor: '#ccc' }}
                >
                  <Image style={{ flex: 1 }} source={{ uri: Bitmoji() }} />
                  </TouchableOpacity>
                  {/*    <CardItem style={{ }}>
       <Body>
          <Text>Joshua</Text>
          <Text note>Mentor</Text>
         
        </Body>
    </CardItem> */}
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
                      <Text style={{ lineHeight: 20, }}>
                        Sample text Sample text Sample text Sample text Sample text
        </Text>
                    </Body>
                  </CardItem>
                </Card>
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
    paddingHorizontal: 25
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
