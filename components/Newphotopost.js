import React, { Component } from 'react';
import { Platform, View, StyleSheet, Image, KeyboardAvoidingView, Alert, ImageBackground, AsyncStorage, TouchableHighlight, TouchableOpacity, BackHandler, ToastAndroid,ActivityIndicator } from 'react-native';
import { Container, Header, Button, Item, Input, Icon, Label, Toast, Textarea, Footer, FooterTab, Left, Body, Thumbnail, Tabs, Tab, TabHeading } from 'native-base';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../constants/Colors';
import Micon from '../components/Micon';
import { ImagePicker } from 'expo';
import Layout from '../constants/Layout';
import { Text } from '../components/Text';
import Ip from '../constants/Ip';

export default class Newphotopost extends Component {
  state = { media: null, load:false, mediatype:'', text:'' }
  post=()=>{
if(!this.state.media || !this.state.mediatype || !this.state.text){
 return ToastAndroid.show('Please what do you want to post about', ToastAndroid.LONG);
}
axios({
  url: `http://${Ip.ip}:4001/post`,
  method: 'post',
  headers: {
   Accept: 'application/json',
   'Content-Type': 'multipart/form-data',
  },
  data: this.state
}).then(({ data }) => {
this.setState({ load:false});
return ToastAndroid.show('Posted!', ToastAndroid.LONG);
console.log(data);
}).catch(err => {
  console.log(JSON.stringify(err));
});
  }
  pickimage = async () => {
  
      this.setState({ load: true });
       
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      //aspect: [4, 3],
    });
    if (result.cancelled) {
      ToastAndroid.show('You need to Pick an Image', ToastAndroid.LONG);
    } else {
     // this.setState({ pic: result });
      const picdata = new FormData();
      picdata.append('file', {
        uri: result.uri,
        type: `image/${result.uri.split('.').pop()}`,
        name: `${result.uri.split('/').pop()}`
       });
      axios({
        url: `http://${Ip.ip}:4001/uploadpic/post`,
        method: 'post',
        headers: {
         Accept: 'application/json',
         'Content-Type': 'multipart/form-data',
        },
        data: picdata
    }).then(({ data }) => {
      this.setState({ media: data.url, load:false, mediatype:'image' });
console.log(data);
      }).catch(err => {
        console.log(JSON.stringify(err));
      });
  //  }
    console.log(result);
  }
  }
  render() {
    return (
      <ImageBackground
        source={require('../assets/images/profile.jpeg')}
        style={[styles.container, { paddingTop: 20 }]}
      >
        <View style={styles.overlay} />
        <Textarea placeholderTextColor='#fff' maxLength={80} style={{ color: '#fff', fontFamily: 'gibson', fontSize: 18 }} selectionColor='#fff' rowSpan={5}  onChangeText={(text) => this.setState({ text })} placeholder="What do you want to talk about?" />
        <View style={{ flex: 1, justifyContent: 'space-between', marginBottom: 15 }}>
          <View style={{ width: Layout.window.width, flex: 0.8 }}>    
          <Image style={{ flex: 1 }} resizeMode='cover' source={{ uri: this.state.media }} /></View>

          <Button iconLeft full onPress={() => this.post()} light style={{ flex: 0.15 }}>
            <Micon name='plus-circle-outline' color='rgb(85,116,247)' />
            <Text style={{ color: 'rgb(85,116,247)' }}>POST</Text>
          </Button>
        </View>
        <Footer style={{}}>
          <FooterTab style={{ backgroundColor: Colors.sky }}>
          {this.state.load ? <Button>
              <ActivityIndicator style={{ alignSelf: 'center', textAlign: 'center' }} size="small" color={Colors.sky2} />
            </Button> :  <Button vertical onPress={this.pickimage}>
              <Micon name='camera' color='#fff' />
              <Text style={{ color: '#fff' }}>Upload a Photo</Text>
            </Button>}   
           
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
