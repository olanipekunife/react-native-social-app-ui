import React, { Component } from 'react';
import { Platform, View, StyleSheet, Alert, ActivityIndicator, ImageBackground, AsyncStorage, TouchableOpacity, Modal, Image, WebView, StatusBar, ToastAndroid } from 'react-native';
import { Root, Icon, Header, Content, Item, Input, Form, Label, Textarea, Footer, FooterTab, Picker, DatePicker, Button } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient, ImagePicker, Constants } from 'expo';
import BrandButton from '../components/BrandButton';
import Checkbox from '../components/Checkbox';
import { Bitmoji } from '../components/Bitmoji';
import Buttonnextwhite from '../components/Buttonnextwhite';
import { Text } from '../components/Text';
import Micon from '../components/Micon';
import axios from 'axios';
import Colors from '../constants/Colors';
import Ip from '../constants/Ip';

export default class MoreInfo extends Component {
  static navigationOptions = {
    header: null,
  };
  // static navigationOptions = {
  //   title: 'Sign Up',
  //   headerLeft: null,
  //   headerStyle: {
  //     backgroundColor: '#DF001D',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //   },
  // };
  state = { headline: '', bio: '', pic: '', load: false }
 
  pickimage = async () => {
    if (!this.state.bio || !this.state.headline) { 
      return ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    }
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
        name: `${`${this.props.navigation.getParam('name')}-${this.props.navigation.getParam('phone')}`}.${result.uri.split('.').pop()}`
       });
      axios({
        url: `http://${Ip.ip}:4001/uploadpic/profile`,
        method: 'post',
        headers: {
         Accept: 'application/json',
         'Content-Type': 'multipart/form-data',
        },
        data: picdata
    }).then(({ data }) => {
      this.setState({ pic: data.url }, () => {
        this.props.navigation.navigate('Getstarted', { ...this.state, ...this.props.navigation.state.params });
      });
console.log(data);
      }).catch(err => {
        console.log(JSON.stringify(err));
      });
  //  }
    console.log(result);
  }
  }
//     signup = async () => {
//    // console.log(this.state);
 
  
//     if (this.state.bio && this.state.headline) {
//       ToastAndroid.show('Loading... Please Wait', ToastAndroid.LONG);
     
       
//         // this.props.navigation.navigate('Getstarted',  {...this.state,...this.props.navigation.state.params} );
//     } else {
//       ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
//   }
// }

  render() {  
    const { goBack } = this.props.navigation;
   

    return (

      <View
        style={{ flex: 1 }}
      >  
           {/* <StatusBar hidden={false} /> */}
           {/* <View style={styles.overlay} /> */}
 <LinearGradient
          colors={['rgb(85,116,247)', 'rgb(96,195,255)']}
          style={styles.overlay}
 />
 
        {/* <Loading modalVisible={this.state.modalVisible} /> */}
 
        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
         <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', lineHeight: 25, }}>We would like Know More About you {this.props.navigation.getParam('name')} </Text>
        </View>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid keyboardOpeningTime={50} extraHeight={Platform.select({ android: 100 })} style={{ flex: 1, paddingBottom: 20, paddingHorizontal: 20 }}>

            <View style={styles.contentid}> 
            <Item style={styles.inputorange}>
                <Textarea placeholderTextColor='#fff' maxLength={50} style={{ color: '#fff', fontFamily: 'gibson', fontSize: 18 }} onChangeText={(headline) => this.setState({ headline })} selectionColor={Colors.sky2} rowSpan={2} placeholder="Headline" />
            </Item>
                <Item style={styles.inputorange}>
                <Textarea placeholderTextColor='#fff' maxLength={150} style={{ color: '#fff', fontFamily: 'gibson', fontSize: 18 }} onChangeText={(bio) => this.setState({ bio })} selectionColor={Colors.sky2} rowSpan={4} placeholder="Biography" />
            </Item>
           
          
          </View>


        </KeyboardAwareScrollView>
        <Footer style={{}}>
          <FooterTab style={{ backgroundColor: '#000' }}>
         {this.state.load ? <Button>
              <ActivityIndicator style={{ alignSelf: 'center', textAlign: 'center' }} size="small" color={Colors.sky2} />
            </Button> : <Button vertical onPress={this.pickimage}>
              <Micon name='account' color='#fff' />
              <Text style={{ color: '#fff' }}>Upload your Picture</Text>
            </Button>}   
          </FooterTab>
        </Footer>
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
        flexDirection: 'row',
        marginBottom: 5,
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

