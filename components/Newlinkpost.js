import React, { Component } from 'react';
import { Platform, View, StyleSheet, Image, KeyboardAvoidingView, Alert, ImageBackground, AsyncStorage, TouchableHighlight, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import { Container, Header, Button, Item, Input, Icon, Label, Toast, Textarea, Footer, FooterTab, Left, Body, Thumbnail, Tabs, Tab, TabHeading } from 'native-base';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../constants/Colors';
import Micon from '../components/Micon';
import { ImagePicker } from 'expo';
import Layout from '../constants/Layout';
import { Text } from '../components/Text';

export default class Newlinkpost extends Component {
  state = { img: null }
  pickimage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      //aspect: [4, 3],
    });
    if (result.cancelled) {
      ToastAndroid.show('You need to Pick an Image', ToastAndroid.LONG);
    } else {
      this.setState({ img: result.uri });
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
        <Item floatingLabel style={{marginLeft:15,marginRight:15, borderColor:'#fff'}}>
                  <Label style={{ color: '#fff', }}>Link</Label>
              <Input 
              autoCapitalize="none"
              selectionColor="#fff"
              style={{ color: '#fff', fontFamily: 'gibson'}} 
              onChangeText={(email) => this.setState({ email })}
              
              />
            </Item>
        <View style={{ flex: 1, justifyContent: 'space-between', marginBottom: 15 }}>
          <View style={{ width: Layout.window.width, flex: 0.8 }}>    
          <Image style={{ flex: 1 }} resizeMode='contain' source={{ uri: this.state.img }} /></View>

          <Button iconLeft full onPress={() => this.signup(true)} light style={{height:20, flex: 0.15 }}>
            <Micon name='plus-circle-outline' color='rgb(85,116,247)' />
            <Text style={{ color: 'rgb(85,116,247)' }}>POST</Text>
          </Button>
        </View>
      
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
