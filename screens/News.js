import React, { Component } from 'react';
import { Platform, View, StyleSheet, Image, KeyboardAvoidingView, Alert, ImageBackground, AsyncStorage, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Container, Header, Button, Item, Input, Icon, Text, Label, Toast, Textarea, Card, CardItem, Left, Body, Thumbnail, Tabs, Tab, TabHeading } from 'native-base';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../constants/Colors';
import Micon from '../components/Micon';

export default class News extends Component {
    static navigationOptions = ({ navigation }) => ({
            headerTitle: 'New Post',
            headerStyle: {
              backgroundColor: Colors.sky, elevation: 0, 

            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'gibson',
              fontWeight: 'normal',
            },
           
          
        });
  render() {
      const { navigation } = this.props;
    return (
        <View
        style={styles.container}
        >
                <Tabs tabContainerStyle={{ backgroundColor: Colors.sky, elevation: 0, borderBottomWidth: 1, borderBottomColor: '#ccc' }} tabBarUnderlineStyle={{ borderBottomWidth: 1, backgroundColor: Colors.noticeText, borderBottomColor: Colors.noticeText }} locked >

<Tab style={{ paddingTop: 20 }} tabStyle={{ backgroundColor: Colors.sky }} textStyle={{ color: '#fff', fontWeight: 'normal', fontFamily: 'gibson' }} activeTabStyle={{ backgroundColor: Colors.sky }} activeTextStyle={{ color: '#fff', fontWeight: 'normal', fontFamily: 'gibson' }} heading={ <TabHeading style={{flexDirection:'column',backgroundColor: Colors.sky, justifyContent:'space-around',}}><Micon name='camera' color='#fff' /><Text style={{fontSize:12,color: '#fff',textAlign: 'center', fontWeight: 'normal'}}>Photo</Text></TabHeading>} />
<Tab tabStyle={{ backgroundColor: Colors.sky,borderBottomWidth: 1 }} textStyle={{ color: '#fff', fontWeight: 'normal', fontFamily: 'gibson' }} activeTabStyle={{ backgroundColor: Colors.sky }} activeTextStyle={{ color: '#fff', fontWeight: 'normal', fontFamily: 'gibson' }} heading={<TabHeading style={{flexDirection:'column',backgroundColor: Colors.sky, justifyContent:'space-around',}}><Micon name='play' color='#fff' /><Text style={{fontSize:12,color: '#fff',textAlign: 'center', fontWeight: 'normal'}}>Video</Text></TabHeading>}>
  {/* <Tab3 /> */}
</Tab>
<Tab tabStyle={{ backgroundColor: Colors.sky }} textStyle={{ color: '#fff', fontWeight: 'normal', fontFamily: 'gibson' }} activeTabStyle={{ backgroundColor: Colors.sky }} activeTextStyle={{ color: '#fff', fontWeight: 'normal', fontFamily: 'gibson' }} heading={ <TabHeading  style={{flexDirection:'column',backgroundColor: Colors.sky, justifyContent:'space-around'}}><Micon name='wifi' color='#fff' /><Text style={{fontSize:12,color: '#fff',textAlign: 'center', fontWeight: 'normal'}}>Link</Text></TabHeading>}>
  {/* <Tab3 /> */}
</Tab>
</Tabs>
           
           
            </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
        backgroundColor: '#fff'
    },
    welcomeContainer: {
     flex: 1,
  marginTop: 20
    },
});
