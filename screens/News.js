import React, { Component } from 'react';
import { Platform, View, StyleSheet, Image, KeyboardAvoidingView, Alert, ImageBackground, AsyncStorage, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Container, Header, Button, Item, Input, Icon, Text, Label, Toast, Textarea, Card, CardItem, Left, Body, Thumbnail } from 'native-base';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class News extends Component {
    static navigationOptions = ({ navigation }) => ({
            headerTitle: `${navigation.getParam('name')} Feed`,
            headerStyle: {
              backgroundColor: '#DF001D'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          
        });
  render() {
      const { navigation } = this.props;
    return (
        <View
        style={styles.container}
        >
             
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid keyboardOpeningTime={50} extraHeight={Platform.select({ android: 10 })} style={{ flex: 1, paddingBottom: 20 }}>
            <View >
                       <Textarea rowSpan={5} bordered placeholder="Say your mind" />
                      </View>
            <View style={{ marginTop: 10 }}>
                            <Button rounded block style={{ backgroundColor: '#992c39' }} onPress={this.signIn}>
        <Text>Post</Text>
    </Button>
                                 
                            </View>
                            <View style={styles.welcomeContainer}>
          <Card style={{ marginVertical: 10 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: navigation.getParam('uri') }} />
                <Body>
                  <Text note>11h ago</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <Image source={require('../assets/images/frensei.jpeg')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
            <CardItem >
            <Body>
          
                <Text>
                  Sample text Sample text Sample text Sample text 
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>122 Likes</Text>
                </Button>
              </Left>
              
             
            </CardItem>
          </Card>
          <Card style={{ marginVertical: 10 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: navigation.getParam('uri') }} />
                <Body>
                  <Text note>11h ago</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <Image source={require('../assets/images/frensei.jpeg')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
            <CardItem >
            <Body>
         
                <Text>
                  Sample text Sample text Sample text Sample text Sample text S
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              
             
            </CardItem>
          </Card>
          </View>
            </KeyboardAwareScrollView>
           
            </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
        backgroundColor: '#fff'
    },
    welcomeContainer: {
     flex: 1,
  marginTop: 20
    },
});
