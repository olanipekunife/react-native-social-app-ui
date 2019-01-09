import React, { Component } from 'react';
import { Platform, View, StyleSheet, Image, KeyboardAvoidingView, Alert, ImageBackground, AsyncStorage, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Container, Header, Button, Item, Input, Icon, Text, Label, Toast } from 'native-base';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import screen from '../constants/Layout';

export default class Signin extends Component {
  static navigationOptions = {
    headerTitle: 'Sign In',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#DF001D',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  state = { email: '', password: '', modalVisible: false }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  signIn = () => {
    return Toast.show({
        text: 'Loading, Please Wait',
       // type: 'warning',
        duration: 3000
      });
    //console.log('c')
    AsyncStorage.removeItem('api-token');
   // console.log('b')

      const { navigate } = this.props.navigation;
      if (this.state.phone < 4 || this.state.password.length < 4) {
        Alert.alert('Error', 'Please fill up all details');
      } else {
        this.setModalVisible(true);

        axios({
          url: 'http://dev.mygiro.co/usersmicroservice/login',
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            username: this.state.phone,
            password: this.state.password
          },
        })
          .then(async (response) => {
            try {
              console.log(response.data);
             
            if (response.data.status == 'success') {
              await AsyncStorage.setItem('api-token', response.data['api-token']);
             
              const userResp = await axios({
                url: 'http://dev.mygiro.co/usersmicroservice/users',
                headers: {
                  'api-token': response.data['api-token'],
                  'Content-Type': 'application/json'
                }
              });
              
              this.setModalVisible(false);
              await AsyncStorage.setItem('user', JSON.stringify(userResp.data['data   ']));
             navigate('Dashboardindex');
            } else {
              Alert.alert('Error', response.data.message[0], [
                {
                  text: 'OK',
onPress: () => {
                    setTimeout(() => { this.setModalVisible(false); }, 100);
                  }
                },
              ], );
            }
            } catch (error) {
              setTimeout(() => { this.setModalVisible(false); }, 100);
            Alert.alert('Error', `Please try logging in -> ${error}`);
          }
          })
          .catch((error) => {
            console.log('y', error);
            console.log(error.response);
            setTimeout(() => {
              this.setModalVisible(false);
            }, 100);
            let content = '';
            if (error.response.data) {
            content = error.response.data.message[0];
              Alert.alert('Error', content);
              // Alert.alert("Error", content, [
              //   { text: 'OK' }
              //  // { text: 'OK', onPress: () => setTimeout(function () { this.setModalVisible(false) }, 100) }
              // ])
            }
          });
      }
  }

  render() {  
    const { goBack } = this.props.navigation;
    return (
  
      <View
      style={styles.container}
      >
           
          <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid keyboardOpeningTime={50} extraHeight={Platform.select({ android: 10 })} style={{ flex: 1, paddingBottom: 20}}>
            <View style={styles.contentid}> 
                   

                           <Item floatingLabel style={styles.inputorange}>
                                  <Label style={styles.white}>Email</Label>
                                <Input
                                  selectionColor="#fff"
                                  style={{ color: '#fff' }}
                                  onChangeText={(email) => this.setState({ email })}
                                  value={this.state.email}
                                />
                            </Item>
                            <Item floatingLabel style={styles.inputorange}>
                                <Label style={styles.white}>Password</Label>
                              <Input
style={{ color: '#fff' }}
                                selectionColor="#fff"
                                secureTextEntry
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                                secureTextEntry
                              />
                            </Item>
                            <View style={styles.hold}>
                            <Button rounded block style={{ backgroundColor: '#992c39' }} onPress={this.signIn}>
        <Text>Login</Text>
    </Button>
                                 
                            </View>
                  
          </View>
          <View style={styles.footer}>
                  <TouchableOpacity 
                  onPress={() => this.props.navigation.navigate('Signup')}
                  > 
                        <Text style={styles.titlesub2}>
                            New user? create account
                        </Text>
                  </TouchableOpacity>
          </View>
       
</KeyboardAwareScrollView>
    </View>
       
 
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
      backgroundColor: '#ff1632'
    },
    icon: {
      color: 'white',
      },
      navigate: {
        paddingVertical: 40,
        maxWidth: 40
     },
     contentid: {  paddingVertical: 40,
       },
       title: {
        fontSize: 35,
        color: 'white',
        fontWeight: '900',
         paddingLeft: 5,
      },
      titlesub: {
        fontSize: 13,
        color: 'white',
        fontWeight: '400',
        letterSpacing: 1,
        marginTop: 25,
        marginBottom: 15,
         paddingLeft: 5, 
      },
    
      white: {
        color: 'white',
   
      },
        whitel: {
        color: 'white',
         paddingLeft: 5,
         fontSize: 13,
         
      },
      hold: {
           marginTop: 15,
        
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
        paddingLeft: 35, 
      },
      checkbox: {
        alignItems: 'flex-end',
  },
  titlesub2: {
    fontSize: 10,
    color: 'white',
    fontWeight: '400',
    letterSpacing: 1,
    marginTop: 25,
    marginBottom: 15,
    paddingLeft: 5,
   
  
      //  alignSelf: 'flex-end'
      },
    footer: {
      flex: 1,
      // marginLeft: 50,
      // marginRight: 50,
      // borderTopColor: 'white',
      // borderColor: 'transparent',
      // borderWidth: 1,
    
    },
    itemorange: {
      borderColor: '#d66c04',
  },
  inputorange: {
    marginBottom: 10,
}


});

