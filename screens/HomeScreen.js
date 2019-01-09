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
import { Container, Header, Content, List, Fab, ListItem, Left, Body, Right, Thumbnail, Text, Card, CardItem, Button, Icon } from 'native-base';
import { Bitmoji } from '../components/Bitmoji';

import { MonoText } from '../components/StyledText';
const json = require('../assets/categories.json');

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
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
        <List>
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
      </List>
          <View style={styles.welcomeContainer}>
          <Card style={{ marginVertical: 10 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: Bitmoji() }} />
                <Body>
                  {/* <Text>Joshua</Text>
                  <Text note>Mentor</Text> */}
                  <Text note>11h ago</Text>
                </Body>
              </Left>
            </CardItem>
              <CardItem cardBody>
            <Image source={require('../assets/images/frensei.jpeg')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
            <CardItem >
            <Body>
                <Text>
                  Sample text Sample text Sample text Sample text Sample text 
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              
             
            </CardItem>
          </Card>
          <Card style={{ marginVertical: 10 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: Bitmoji() }} />
                <Body>
                  {/* <Text>Stephen</Text>
                  <Text note>Mentor</Text> */}
                  <Text note>11h ago</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <Image source={require('../assets/images/frensei.jpeg')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
            <CardItem >
            <Body>
                <Text>
                  Sample text Sample text Sample text Sample text Sample text 
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>2 Likes</Text>
                </Button>
              </Left>
              
             
            </CardItem>
          </Card>
          </View>

       </ScrollView>
        <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#992c39' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}
        >
            <Icon name="md-add" />
            <Button style={{ backgroundColor: '#992c39' }} onPress={() => this.props.navigation.navigate('News', { name: 'Joshua', uri: this.state.bitmoji })}>
              <Icon name="md-paper" />
            </Button>
           
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
    paddingTop: 30,
  },
  welcomeContainer: {
   flex: 1,
marginTop: 20
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
