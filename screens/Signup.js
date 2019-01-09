import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Alert, ActivityIndicator, ImageBackground, AsyncStorage, TouchableOpacity, Modal, Image, WebView } from 'react-native';
import { Root, Icon, Header, Content, Item, Input, Form, Label, Picker, Toast, DatePicker } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo';
import axios from 'axios';
import BrandButton from '../components/BrandButton';
import Checkbox from '../components/Checkbox';
import { Bitmoji } from '../components/Bitmoji';
import Buttonnextwhite from '../components/Buttonnextwhite';
const json = require('../assets/countries.json');

export default class Signup extends Component {
  static navigationOptions = {
    title: 'Sign Up',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#DF001D',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  state = { show: false, city: '', name: '', phone: '', password: '', Loading: true, terms: 'no', userCountry: '', userCountryCode: '', sex: 0, gender: 'Male', moji: 'https://placeimg.com/100/100/arch/sepia', date: '' }
 

    signup = async (show = false) => {
   // console.log(this.state);
  if (show) {
  return Alert.alert(
      'Continue to Snapchat',
      'Continue to Snapchat to Upload Bitmoji?',
      [ 
         { text: "I don't have a Snapchat Account",
onPress: async() => {
          await AsyncStorage.setItem('state', JSON.stringify(this.state));
          this.props.navigation.navigate('Main');
        } },
        { text: 'I have a Snapchat Account', onPress: () => this.setState({ show }) }
      
      ],
      { cancelable: false }
    );
  }
   await AsyncStorage.setItem('state', JSON.stringify(this.state));
    this.props.navigation.navigate('Main');
    if (this.state.terms == 'no') {
     return Toast.show({
        text: 'You have to Accept Terms and Conditions',
        type: 'warning',
        duration: 3000
      });
    }
    if (this.state.name && this.state.date && this.state.password && this.state.userCountry) {
      const data = {
  ...this.state
      };
      Toast.show({
        text: 'Loading... Please Wait',
        duration: 4000
      });
    
      // axios.post('https://entreprenuer.herokuapp.com/api/createUser', data).then((resp) => { 
      //   Toast.show({
      //     text: 'Congratulations!!. Details Saved. You will be notified when the application is ready to launch',
      //     type: 'success',
      //     duration: 4900
      //   });
      //   setTimeout(() => {
      //     this.props.navigation.navigate('Landingpage');
      //   }, 5000);
      // }).catch((err) => {
      //   Toast.show({
      //     text: `An error occured. ${err.response}`,
      //     type: 'danger',
      //     duration: 3000
      //   });
      // });
    } else {
      Toast.show({
        text: 'Please fill all Fields',
        type: 'danger',
        duration: 3000
      });
  }
}
urlchange = async(e) => {
  let accesstoken = null;
//get accesstoken console.log(e.split('&')[1].split('=')[1])
if (e.canGoBack && !e.loading && e.title == 'ok') {
  console.log('go');
 accesstoken = e.url.split('&')[1].split('=')[1];
 const resp = await axios({
  url: 'https://kit.snapchat.com/v1/me',
  method: 'post',
  headers: {
    Authorization: `Bearer ${accesstoken}`,
    'Content-Type': 'application/json'
  },
  data: {
      query: '{me{displayName bitmoji{avatar}}}'
  },
});
this.setState({ moji: resp.data.data.me.bitmoji.avatar });
this.signup();
}
}
  render() {  
    const { goBack } = this.props.navigation;
    const countries = json.map((country) =>

    <Picker.Item key={country.code} label={country.name} value={country.code} />
  );
   if (this.state.show) {
return (
  <WebView
  onNavigationStateChange={this.urlchange}
    style={{ flex: 1 }}
  originWhitelist={['*']}
  source={{ uri: 'https://ifeoluwa.online/snap.html' }}
  />
); 
}
    return (

      <ImageBackground
source={require('../assets/images/signup.jpg')}
        style={{ flex: 1, paddingHorizontal: 15 }}
      >  
 <LinearGradient
          colors={['rgba(223, 0, 29,0.8)', 'rgba(153, 113, 117, 0.6)']}
          style={styles.overlay}
 />
 
        {/* <Loading modalVisible={this.state.modalVisible} /> */}
 
        {/* <View style={{ justifyContent: 'flex-start' }}>
          <TouchableOpacity
style={styles.navigate}
          onPress={() => goBack()}
          >
              <Icon active name='md-arrow-back' style={styles.icon} />
          </TouchableOpacity>
        </View> */}
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid keyboardOpeningTime={50} extraHeight={Platform.select({ android: 100 })} style={{ flex: 1, paddingBottom: 20 }}>

            <View style={styles.contentid}> 
              {/* <Text style={styles.title}>
                    Sign Up
              </Text> */}
              <Text style={styles.titlesub}>
                    Create your Frensei account.
              </Text>
              <Item regular style={styles.inputorange}>
                  {/* <Label style={styles.white}>Name</Label> */}
              <Input
               placeholderTextColor="#fff"
              placeholder="Name"
              autoCapitalize="words"
              selectionColor="#fff"
              style={{ color: '#fff', fontSize: 13, height: 40 }}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              />
            </Item>
            <Item style={styles.inputorange}>
            <DatePicker
             style={{ height: 40 }}
            defaultDate={new Date(1998, 4, 4)}
            minimumDate={new Date(1978, 10, 12)}
            maximumDate={new Date(2018, 12, 31)}
            locale={'en'}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={'fade'}
            androidMode={'default'}
            placeHolderText="Date of Birth"
            textStyle={{ color: '#fff', fontSize: 13 }}
            placeHolderTextStyle={{ color: '#fff' }}
            onDateChange={(newdate) => this.setState({ date: newdate.toString().substr(4, 12) })}
            />
            </Item>
            {/*<Item floatingLabel style={styles.inputorange}>
              <Label style={styles.white}>Phone Number</Label>
              <Input 
              keyboardType='numeric'
              selectionColor="#fff"
              style={{ color: '#fff' }} 
              onChangeText={(phone) => this.setState({ phone })}
              value={this.state.phone}
              />
    </Item>*/}
               {/* <Item floatingLabel style={styles.inputorange}>
                  <Label style={styles.white}>Email</Label>
              <Input 
              autoCapitalize="none"
              selectionColor="#fff"
              keyboardType='email-address' 
              style={{ color: '#fff' }}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              />
            </Item> */}
             <Item regular style={styles.inputorange}>
                  {/* <Label style={styles.white}>Email</Label> */}
              <Input 
              placeholderTextColor="#fff"
              placeholder="Phone Number"
              autoCapitalize="none" 
               keyboardType='numeric'
              selectionColor="#fff"
              style={{ color: '#fff', fontSize: 13, height: 40 }}
              onChangeText={(phone) => this.setState({ phone })}
              value={this.state.phone}
              />
            </Item>
            <Item regular style={styles.inputorange}>
                  {/* <Label style={styles.white}>Email</Label> */}
              <Input 
              placeholderTextColor="#fff"
              placeholder="City"
              autoCapitalize="none"
              selectionColor="#fff"
              style={{ color: '#fff', fontSize: 13, height: 40 }}
              onChangeText={(city) => this.setState({ city })}
              value={this.state.city}
              />
            </Item>
              <Item picker style={styles.inputorange}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined, color: '#fff', height: 40 }}
                textStyle={{ fontSize: 13 }}
                placeholder="Country"
                placeholderStyle={{ color: '#fff' }}
                placeholderIconColor="#fff"
                selectedValue={this.state.userCountryCode}
                onValueChange={(itemValue, itemName) => this.setState({ userCountryCode: itemValue, userCountry: itemName })}
              >
               <Picker.Item label="Country" value='' />
            {countries}
              </Picker>
            </Item>
            <Item picker style={styles.inputorange}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined, color: '#fff', height: 40 }} 
                 textStyle={{ fontSize: 13 }}
                placeholder="Gender"
                placeholderStyle={{ color: '#fff' }}
                placeholderIconColor="#fff"
                selectedValue={this.state.sex}
                onValueChange={(itemValue, itemName) => this.setState({ sex: itemValue, gender: itemName })}
              >
               <Picker.Item label='Gender' value='' />
            <Picker.Item label='Male' value='0' />
            <Picker.Item label='Female' value='1' />
              </Picker>
            </Item>
          
           
              <Item regular style={styles.inputorange}>
                  {/* <Label style={styles.white}>Password</Label> */}
              <Input
              placeholderTextColor="#fff"
              placeholder="Password"
              style={{ color: '#fff', fontSize: 13, height: 40 }}
              selectionColor="#fff"
              secureTextEntry
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              />
            </Item>
            <View style={styles.inputorange}>
            <Checkbox
              name="agree"
              checked={(this.state.terms == 'yes')}
              text="I agree to the non-disclosure and privacy agreement"
              style={{ backgroundColor: '#db0036', color: '#fff', marginRight: 10, borderRadius: 50, borderWidth: 0, height: 50, width: 50, fontSize: 10, paddingTop: 10 }}
              onChange={(name, checked, yn) => { this.setState({ terms: yn }); }}
            />
            </View>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'center', height: 120 }}>
            <Image style={{ width: 100, height: 100, alignSelf: 'center', paddingTop: 30, paddingBottom: 10 }} source={{ uri: this.state.moji }} />  
            </View> */}
              {/* <View style={styles.hold}>
                    <View style={styles.inner}>
                          <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Signin')}
                          >
                                <Text style={styles.whitel}>
                                    I have an account
                                </Text>
                          </TouchableOpacity>
                      </View>
                    <View style={styles.inner1}>
                       
                          <BrandButton
                          title='Sign Up'
                          action={this.signup}
                          />                 
       
                    </View>
                    
              </View> */}
           
                         <View style={styles.hold}>
                    <View style={styles.inner}>
                          <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Signin')}
                          >
                                <Text style={styles.whitel}>
                                    I have an account
                                </Text>
                          </TouchableOpacity>
                      </View>
                    <View style={styles.inner1}>
                          <TouchableOpacity
style={styles.checkbox}
                          onPress={() => this.signup(true)
                          }
                          >
                          <Buttonnextwhite /> 
                  </TouchableOpacity>
       
                    </View>
                    
              </View> 
          </View>


        </KeyboardAwareScrollView>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
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
      flex: 7
       },
       title: {
        fontSize: 30,
        color: 'white',
        fontWeight: '500',
         paddingLeft: 1,
      },
      titlesub: {
        fontSize: 13,
        color: 'white',
        fontWeight: '400',
        letterSpacing: 1,
        marginTop: 25,
        marginBottom: 15,
         paddingLeft: 1, 
      },

      white: {
        color: 'white',
      },
      hold: {
        flexDirection: 'row',
        marginVertical: 5,
        },
      inner: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        flex: 1,
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

