import React, { Component } from 'react';
import { Platform, View, StyleSheet, Image, KeyboardAvoidingView, Alert, ImageBackground, AsyncStorage, TouchableHighlight, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import { Container, Header, Button, Item, Input, Icon, Label, Toast, Textarea, Footer, FooterTab, Left, Body, Tabs, Tab, TabHeading } from 'native-base';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../constants/Colors';
import Micon from '../components/Micon';
import { ImagePicker } from 'expo';
import { Thumbnail } from 'react-native-thumbnail-video';
import { Text } from '../components/Text';

import Layout from '../constants/Layout';
export default class Newvideopost extends Component {
  state = { cards: [], med: 'https://www.youtube.com/watch?v=tupb4xV-15w' }
  pickvideo = async() => {
    const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'Videos',
    allowsEditing: true
    });
    if (result.cancelled) {
        ToastAndroid.show('You need to Pick a Video', ToastAndroid.LONG);
     } else {
         this.setState({ med: result.uri });
     }
    console.log(result);
}
  render() {
    return (
        <ImageBackground
        source={require('../assets/images/profile.jpeg')}
            style={[styles.container, { paddingTop: 20 }]}
        >
         <View style={styles.overlay} />
         <Textarea placeholderTextColor='#fff' maxLength={80} style={{ color: '#fff', fontFamily: 'gibson', fontSize: 18 }} selectionColor='#fff' rowSpan={5} placeholder="What do you want to talk about?" />
         <View style={{ flex: 1, justifyContent: 'space-between', marginBottom: 15 }}>
         <View style={{ width: Layout.window.width, flex: 0.8 }}>  
         {/* <Thumbnail url={this.state.med} /> */}
         <Image style={{ flex: 1, }} resizeMode='center' source={{ uri: this.state.med }} />
           </View>
         <Button iconLeft full onPress={() => this.signup(true)} light style={{ flex: 0.15 }}>
                                 <Micon name='plus-circle-outline' color='rgb(85,116,247)' />
                    <Text style={{ color: 'rgb(85,116,247)' }}>POST</Text>
        </Button>
         </View>
         <Footer style={{ }}>
                  <FooterTab style={{ backgroundColor: Colors.sky }}>
                    <Button vertical onPress={this.pickvideo}>
                    <Micon name='play' color='#fff' />
                      <Text style={{ color: '#fff' }}>Upload a Video</Text>
                    </Button>
                   
                  </FooterTab>
                </Footer>
              </ImageBackground>
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
      overlay: {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: Colors.sky,
          opacity: 0.7
        },
});
