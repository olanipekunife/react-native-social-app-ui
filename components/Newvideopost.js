import React, { Component } from 'react';
import { Platform, View, StyleSheet, Image, KeyboardAvoidingView, Alert, ImageBackground, AsyncStorage, TouchableHighlight, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import { Container, Header, Button, Item, Input, Icon, Text, Label, Toast, Textarea, Footer, FooterTab, Left, Body, Thumbnail, Tabs, Tab, TabHeading } from 'native-base';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../constants/Colors';
import Micon from '../components/Micon';

export default class Newvideopost extends Component {
  state = { cards: [] }
 
  render() {
    return (
        <ImageBackground
        source={require('../assets/images/profile.jpeg')}
            style={[styles.container, { paddingTop: 20 }]}
        >
         <View style={styles.overlay} />
         <Textarea placeholderTextColor='#fff' style={{ color: '#fff', fontFamily: 'gibson', fontSize: 18 }} selectionColor='#fff' rowSpan={5} placeholder="What do you want to talk about?" />
         <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
         <Button iconLeft full onPress={() => this.signup(true)} light style={{ }}>
                                 <Micon name='plus-circle-outline' color='rgb(85,116,247)' />
                    <Text style={{ color: 'rgb(85,116,247)' }}>POST</Text>
        </Button>
         </View>
         <Footer style={{ }}>
                  <FooterTab style={{ backgroundColor: Colors.sky }}>
                    <Button vertical>
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
