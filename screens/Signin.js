import React, { Component } from 'react';
import { Platform, View, StyleSheet, Alert, ActivityIndicator, ImageBackground, AsyncStorage, TouchableOpacity, Modal, Image, WebView, StatusBar, ToastAndroid } from 'react-native';
import { Root, Icon, Header, Content, Item, Input, Form, Label, Picker, DatePicker, Button } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient, Constants } from 'expo';
import axios from 'axios';
import BrandButton from '../components/BrandButton';
import Checkbox from '../components/Checkbox';
import { Bitmoji } from '../components/Bitmoji';
import Buttonnextwhite from '../components/Buttonnextwhite';
import { Text } from '../components/Text';
import Micon from '../components/Micon';
import Colors from '../constants/Colors';
import Ip from '../constants/Ip';

const json = require('../assets/countries.json');

export default class Signin extends Component {
  static navigationOptions = {
    header: null,
  };
  state = { email: '', password: '', modalVisible: false, passwordused: '', phone: '', moji: '', exist: false }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  async componentDidMount() {
    const stat = JSON.parse(await AsyncStorage.getItem('user'));
    if (stat !== null) {
      this.setState({ moji: stat.moji, phone: stat.phone, passwordused: stat.password, exist: true });
    }
  }
  signIn = async() => {
    if (!this.state.phone || !this.state.password) {
      return ToastAndroid.show('Please fill all details', ToastAndroid.SHORT);
    }
    if (this.state.exist) {
if (this.state.password !== this.state.passwordused) {
return ToastAndroid.show('Wrong password', ToastAndroid.SHORT);
}
    this.props.navigation.navigate('Main');
    } else {
     ToastAndroid.show('Please Wait', ToastAndroid.LONG);

       const daata = await axios({
      url: `${Ip.ip}/user/${this.state.phone}/${this.state.password}`,
      method: 'get'
    });
console.log(daata.data);
if (daata.data) {
  ToastAndroid.show('Logged In', ToastAndroid.LONG);
  await AsyncStorage.removeItem('user');
  await AsyncStorage.setItem('user', JSON.stringify(daata.data));
  this.props.navigation.navigate('Main');
} else {
  ToastAndroid.show('Wrong Credentials', ToastAndroid.LONG);
}
    }
  }

  render() {
    const { goBack } = this.props.navigation;
    let exist = null;
    if (this.state.exist) {
      exist = (<View style={{ alignItems: 'center', alignSelf: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 10, height: 100, width: 100, backgroundColor: '#fff' }}>
        <Image source={{ uri: this.state.moji }} resizeMode='contain' style={{ height: 99, width: 99 }} />
      </View>
      );
    } else {
      exist = (
        <Item floatingLabel style={styles.inputorange}>
          <Label style={{ color: '#fff', }}>Phone Number</Label>
          <Input
            placeholderTextColor="#fff"
            // placeholder="Phone Number"
            autoCapitalize="none"
            keyboardType='numeric'
            selectionColor="#fff"
            style={{ color: '#fff', }}
            onChangeText={(phone) => this.setState({ phone })}
            value={this.state.phone}
          />
        </Item>
      );
    }
    return (

      <View
        style={{ flex: 1, paddingHorizontal: 20 }}
      >
        {/* <StatusBar hidden={false} /> */}
        {/* <View style={styles.overlay} /> */}
        <LinearGradient
          colors={['rgb(96,195,255)', 'rgb(85,116,247)']}
          style={styles.overlay}
        />

        {/* <Loading modalVisible={this.state.modalVisible} /> */}

        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 30 }}>Sign In</Text>
        </View>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid keyboardOpeningTime={50} extraHeight={Platform.select({ android: 100 })} style={{ flex: 0.6, paddingBottom: 20 }}>

          <View style={styles.contentid}>
            {/*  <Text style={styles.title}>
                  Sign Up
            </Text>
            <Text style={styles.titlesub}>
                  Create your Frensei account.
            </Text> */}
            {exist}
            <Item floatingLabel style={[styles.inputorange, { marginTop: this.state.exist ? 20 : 0 }]}>
              <Label style={{ color: '#fff', }}>Password</Label>
              <Input
                placeholderTextColor="#fff"
                // placeholder="Password"
                style={{ color: '#fff', }}
                selectionColor="#fff"
                secureTextEntry
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
              />
            </Item>


            <View style={styles.hold}>
              <Button iconLeft block onPress={() => this.signIn()} light style={{ flex: 1 }}>
                <Text style={{ color: 'rgb(85,116,247)' }}>Log In</Text>
              </Button>
              <View style={styles.inner}>
                          <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Signup')}
                          >
                                <Text style={styles.whitel}>
                                    I do not have an account
                                </Text>
                          </TouchableOpacity>
                      </View>

            </View>
          </View>

        </KeyboardAwareScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  // overlay: {
  //   position: 'absolute',
  //   top: 0,
  //   right: 0,
  //   bottom: 0,
  //   left: 0,
  //   backgroundColor: '#000',
  //   opacity: 0.5
  // },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  icon: {
    color: 'white',
    fontSize: 20
  },
  navigate: {
    paddingVertical: 30,
    maxWidth: 40
  },
  inputorange: {
    marginBottom: 15
  },
  contentid: {
    marginTop: 10
  },
  title: {
    fontSize: 25,
    color: 'white',
    fontWeight: '500',
    marginTop: 30,
  },
  titlesub: {

    color: 'white',
    fontWeight: '400',
    letterSpacing: 1,
    marginTop: 25,
    marginBottom: 15,
    // paddingLeft: 1, 
  },

  white: {
    color: 'white',
  },
  hold: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 5,
  },
  inner: {
    // width: 50,
    // height: 50,
    justifyContent: 'center',
    marginTop: 10,
    //  flex: 1,
  },
  inner1: {
    flex: 1,
    width: 50,
    height: 50,
  },
  // hold: {
  //   flexDirection: 'row',
  //   paddingVertical: 20,
  //   },
  // inner: {
  //   width: 50,
  //   height: 50,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   flex: 1,
  // }, 
  //   inner1: {
  //   flex: 1,
  //   alignSelf: 'center'
  // },
  checkbox: {
    alignItems: 'flex-end',
  },
  footer: {
    flex: 1,
    borderTopColor: 'white',
    borderColor: 'transparent',
    borderWidth: 1,
  },
  itemorange: {
    borderColor: '#d66c04'
  },
  whitel: {
    color: 'white',
    paddingLeft: 5,
  },

});

