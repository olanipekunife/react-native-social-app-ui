import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native';
import * as Animatable from 'react-native-animatable';
import StarRating from 'react-native-star-rating';
import { LinearGradient } from 'expo';
import { Header } from 'react-navigation';
import { Container, Content, List, Fab, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Button, Icon, Tabs, Tab, TabHeading, } from 'native-base';
import About from '../components/About';
import Connections from '../components/Connections';
import Posts from '../components/Posts';

import { Text } from '../components/Text';
import Micon from '../components/Micon';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import Colors from '../constants/Colors';
import { Bitmoji } from '../components/Bitmoji';
import axios from 'axios'
import Ip from '../constants/Ip';

const star = require('../assets/images/star.png');
const MIN_HEIGHT = 130;
const MAX_HEIGHT = 350;

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

    state = { showNavTitle: false, blur: 0, maximg: true, smallimg: false, stopscrollbhide: false, stopscrollthide: true, moji: 'https://via.placeholder.com/100', pic: 'https://via.placeholder.com/800', country: '', name: '', posts:[], mentors:{requests:[]}, bio:'', head:'' };
 async componentDidMount() {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
 const {data} = await axios({
      url: `http://${Ip.ip}:4001/postbyuser/${user._id}`,
      method: 'get'
    })


      console.log(data);
 const mentors =  await axios({
  url: `http://${Ip.ip}:4001/mentor/${user._id}`,
  method: 'get'
})
this.setState({ moji: user.moji, pic: user.pic, country: user.userCountry, name: user.name, posts:data, mentors:mentors.data,bio: user.bio, head: user.headline });
 console.log(mentors.data)
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderImageScrollView
        showsVerticalScrollIndicator={false}
          bounces={false}
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          onScroll={() => { this.state.stopscrollthide ? this.setState({ smallimg: false }) : null; this.state.stopscrollbhide ? this.setState({ maximg: false }) : null; }}
          onScrollBeginDrag={event => {
            // this.state.smallimg || this.state.maximg ? this.setState({ maximg: false, smallimg: false }) : null;
            console.log(event.nativeEvent.contentOffset.y, 'begin');
}}
// onScroll={() => { this.state.smallimg || this.state.maximg ? this.setState({ maximg: false, smallimg: false }) : null; }}
onScrollEndDrag={event => {
  console.log(event.nativeEvent.contentOffset.y); 
}}
          //fadeOutForeground
          renderHeader={() => <Image blurRadius={this.state.blur} source={{ uri: this.state.pic }} style={styles.image} />}
          renderFixedForeground={() => (
            <Animatable.View
              style={styles.navTitleView}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}
            >
              <Text style={styles.navTitle}>
              {this.state.name}
                </Text>
              <Text note style={styles.keyword}>{this.state.country}</Text>
            </Animatable.View>
          )}
          renderForeground={() => (
            this.state.smallimg ? null :
            <View style={styles.titleContainer}>
              <Text style={[styles.imageTitle, { marginVertical: 5 }]}>{this.state.name}</Text>
              <Text note style={styles.keyword}>{this.state.country}</Text>
              <StarRating
                containerStyle={{ marginVertical: 5 }}
                disabled
                maxStars={5}
                rating={4}
                starSize={14}
                fullStarColor='#fff'
              />
              <LinearGradient
                colors={[Colors.darkblue, Colors.sky2]}
                start={[0, 1]}
                end={[1, 0]}
                style={{ width: Dimensions.get('window').width, height: 50, marginTop: 15 }}
              >
                <Button iconLeft full onPress={() => alert('ok')} transparent style={{ flex: 1 }}>
                  <Micon name='account-plus-outline' color='#fff' />
                  <Text style={{ color: '#fff' }}>Connect</Text>
                </Button>
              </LinearGradient>

            </View>
          )}
        >
          <TriggeringView
            //style={styles.section}
            
            onHide={() => { this.navTitleView.fadeInUp(200); this.setState({ smallimg: true, blur: 5 }); }}
            onDisplay={() => { this.navTitleView.fadeOut(100); this.setState({ maximg: true, blur: 0 }); }}
            onBeginHidden={() => { this.state.maximg ? this.setState({ maximg: false, stopscrollbhide: true, stopscrollthide: false }) : null; }}
            onBeginDisplayed={() => { this.state.smallimg ? this.setState({ smallimg: false, stopscrollthide: true, stopscrollbhide: false }) : null; }}
          //  onTouchTop={() => { console.log('top'); this.setState({ stopscrollhide: false }); }}
          //  onTouchBottom={() => { console.log('b'); this.setState({ stopscrollhide: false }); }}
          >

            {/* <Text style={styles.title}>
                <Text style={styles.name}>Stephanie Cole</Text>, (2009)
              </Text> */}
          </TriggeringView>
          <View style={[styles.container, { paddingHorizontal: 15, marginTop: 15 }]}>
          <Tabs tabContainerStyle={{ backgroundColor: Colors.noticeText, elevation: 0, borderBottomWidth: 1, borderBottomColor: '#ccc' }} tabBarUnderlineStyle={{ borderBottomWidth: 1, backgroundColor: Colors.noticeText, borderBottomColor: Colors.sky }} locked >

<Tab style={{ }} tabStyle={{ backgroundColor: Colors.noticeText, }} textStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson', textAlign: 'center' }} activeTabStyle={{ backgroundColor: Colors.noticeText }} activeTextStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson', textAlign: 'center' }} heading={<TabHeading style={{ flexDirection: 'column', backgroundColor: Colors.noticeText, justifyContent: 'space-around' }}><Text style={{ color: '#000', textAlign: 'center' }} >{' '}</Text><Text style={{ fontSize: 12, color: '#000', textAlign: 'center', fontWeight: 'normal' }}>About</Text></TabHeading>}>

<About bio={this.state.bio} head={this.state.headline}  />
</Tab>
{/* <Tab tabStyle={{ backgroundColor: Colors.noticeText }} textStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson' }} activeTabStyle={{ backgroundColor: Colors.noticeText }} activeTextStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson' }} heading="Spanish">
</Tab> */}
<Tab tabStyle={{ backgroundColor: Colors.noticeText }} textStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson', textAlign: 'center', marginLeft: 2, marginRight: 2 }} activeTabStyle={{ backgroundColor: Colors.noticeText }} activeTextStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson', textAlign: 'center', marginLeft: 2, marginRight: 2, }} heading={<TabHeading style={{ flexDirection: 'column', backgroundColor: Colors.noticeText, justifyContent: 'space-around' }}><Text style={{ color: '#000', textAlign: 'center' }} >{this.state.mentors.requests.length}</Text><Text style={{ fontSize: 12, color: '#000', textAlign: 'center', fontWeight: 'normal' }}>Connections</Text></TabHeading>}>
 <Connections />
</Tab>
{/* <Tab tabStyle={{ backgroundColor: Colors.noticeText }} textStyleConnections={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson', textAlign: 'center' }} activeTabStyle={{ backgroundColor: Colors.noticeText }} activeTextStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson', textAlign: 'center' }} heading={<TabHeading style={{ flexDirection: 'column', backgroundColor: Colors.noticeText, justifyContent: 'space-around' }}><Text style={{ color: '#000', textAlign: 'center' }} >4</Text><Text style={{ fontSize: 12, color: '#000', textAlign: 'center', fontWeight: 'normal' }}>Interests</Text></TabHeading>}>
   <Tab3 /> 
</Tab> */}
<Tab tabStyle={{ backgroundColor: Colors.noticeText }} textStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson', textAlign: 'center' }} activeTabStyle={{ backgroundColor: Colors.noticeText }} activeTextStyle={{ color: '#000', fontWeight: 'normal', fontFamily: 'gibson', textAlign: 'center' }} heading={<TabHeading style={{ flexDirection: 'column', backgroundColor: Colors.noticeText, justifyContent: 'space-around' }}><Text style={{ color: '#000', textAlign: 'center' }} >{this.state.posts.length}</Text><Text style={{ fontSize: 12, color: '#000', textAlign: 'center', fontWeight: 'normal' }}>Posts</Text></TabHeading>}>
<Posts posts={this.state.posts} />
</Tab>
</Tabs>
</View>
        
        </HeaderImageScrollView>
        {this.state.maximg && <Animatable.View
          ref={maxView => {
            this.maxView = maxView;
          }}
          style={{
            width: 60,
            height: 60,
            position: 'absolute',
            zIndex: 1,
            left: 40,
            top: MAX_HEIGHT - 40,
            borderWidth: 3,
            borderColor: '#fff',
            borderRadius: 5,
            backgroundColor: '#ccc'
          }}
        >
          <Image style={{ flex: 1 }} resizeMode='contain' source={{ uri: this.state.moji }} />
        </Animatable.View>}
        {this.state.smallimg && <Animatable.View
          ref={smallView => {
            this.smallView = smallView;
          }}
          style={{
            width: 60,
            height: 60,
            position: 'absolute',
            zIndex: 1,
            left: 40,
            top: MIN_HEIGHT - 30,
            borderWidth: 3,
            borderColor: '#fff',
            borderRadius: 5,
            backgroundColor: '#ccc'
          }}
        >
          <Image style={{ flex: 1 }} resizeMode='contain' source={{ uri: this.state.moji }} />
        </Animatable.View>}
        <TouchableOpacity
          style={{
            maxWidth: 60,
            position: 'absolute',
            zIndex: 1,
            left: 25,
            top: Header.HEIGHT - 20,
            
          }}
          onPress={() => { this.props.navigation.goBack(null); }}
        >
           <Micon name='arrow-left' style={{ flex: 1 }} color='#fff' />
        </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  keywords: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  keywordContainer: {
    backgroundColor: '#999999',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  keyword: {
    fontSize: 18,
    color: '#ccc',
  },
  titleContainer: {
    zIndex: 0,
    flex: 1,
    // alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
    //marginBottom: 25
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    zIndex: 0,
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    height: 600,
  }, 
welcomeContainer: {
    flex: 1,
    marginVertical: 15,
   // paddingHorizontal: 25
  },
});
export default SettingsScreen;
