import React, { Component } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Platform, View, Image, Dimensions, StatusBar, TouchableOpacity, AsyncStorage, Alert, ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Colors from '../constants/Colors';
import { Thumbnail } from 'native-base';
import { Text } from '../components/Text';
import axios from 'axios';
import Ip from '../constants/Ip';

class LogoTitle extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>             
                <Thumbnail small resizeMode='contain' source={{ uri: this.props.moji }} />
                <Text style={{ color: '#fff', alignSelf: 'center' }}>{this.props.name}</Text>
            </View>
        );
    }
}

export default class Chat extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: <LogoTitle name={navigation.getParam('name')} moji={navigation.getParam('moji')} />,
        headerStyle: {
            backgroundColor: Colors.sky

        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontFamily: 'gibson',
            fontWeight: 'normal',
        },


    });
    state = {
        messages: [],
        user: '',
        name: ''
    };

    componentDidMount = async() => {
        try {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        const { data } = await axios({
            url: `${Ip.ip}/chat/${user._id}/${this.props.navigation.getParam('userid')}`,
            method: 'get'
          });
          console.log(data.messages);
        this.setState({
            user: user._id,
            name: user.name,
            messages: data.messages
            // messages: [
            //     {
            //         _id: 1,
            //         text: 'Hello Joshua, Thanks for accepting, i need help',
            //         createdAt: new Date(),
            //         user: {
            //             _id: 2,
            //             name: 'React Native',
            //        //     avatar: 'https://sdk.bitmoji.com/render/panel/e0dd4272-6166-423e-a54c-3ea1c7a824c6-AU0zNWNUxbvey5ZjA3BSqYYI2unFOw-v1.png?transparent=1&palette=1',
            //         },
            //     },
            // ],
      
        });
    
       this.inter = setInterval(async() => {
            const { data } = await axios({
                url: `${Ip.ip}/chat/${user._id}/${this.props.navigation.getParam('userid')}`,
                method: 'get'
              });
              console.log(data.messages);
            this.setState({
                user: user._id,
                name: user.name,
                messages: data.messages
                // messages: [
                //     {
                //         _id: 1,
                //         text: 'Hello Joshua, Thanks for accepting, i need help',
                //         createdAt: new Date(),
                //         user: {
                //             _id: 2,
                //             name: 'React Native',
                //        //     avatar: 'https://sdk.bitmoji.com/render/panel/e0dd4272-6166-423e-a54c-3ea1c7a824c6-AU0zNWNUxbvey5ZjA3BSqYYI2unFOw-v1.png?transparent=1&palette=1',
                //         },
                //     },
                // ],
            });
        }, 3000);
    } catch (error) {
        console.log(error);
        console.log(error.response);
    }
    }
    componentWillUnmount() {
        clearInterval(this.inter);
    }
    renderBubble = (props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#fff',
              },
              right: {
                  backgroundColor: 'rgb(96,195,255)'
              }
            }}
          />
        )
    onSend = async(messages = []) => {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), async() => {
            await axios({
            url: `${Ip.ip}/chat/${this.state.user}/${this.props.navigation.getParam('userid')}`,
            method: 'post',
            data: { msg: messages }
          });
            console.log(this.state.messages);
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <GiftedChat
                    //    showUserAvatar
                  //  inverted={false}
                    renderBubble={this.renderBubble}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: this.state.user,
                        name: this.state.name
                    }}
                     renderAvatar={() => null}
                />
                {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
            </View>

        );
    }
}
