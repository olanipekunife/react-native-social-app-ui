import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Platform, View, Image, Dimensions, StatusBar, TouchableOpacity, AsyncStorage, Alert, ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Colors from '../constants/Colors';
import { Thumbnail } from 'native-base';
import { Text } from '../components/Text';

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
    };

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                   //     avatar: 'https://sdk.bitmoji.com/render/panel/e0dd4272-6166-423e-a54c-3ea1c7a824c6-AU0zNWNUxbvey5ZjA3BSqYYI2unFOw-v1.png?transparent=1&palette=1',
                    },
                },  
                 {
                    _id: 5,
                    text: 'i need helpr',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                   //     avatar: 'https://sdk.bitmoji.com/render/panel/e0dd4272-6166-423e-a54c-3ea1c7a824c6-AU0zNWNUxbvey5ZjA3BSqYYI2unFOw-v1.png?transparent=1&palette=1',
                    },
                },
            ],
        });
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            console.log(this.state.messages);
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <GiftedChat
                    //    showUserAvatar
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                     renderAvatar={() => null}
                />
                {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
            </View>

        );
    }
}
