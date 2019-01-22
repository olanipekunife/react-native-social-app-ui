import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo';
import { Header } from 'react-navigation';
import { Container, Content, List, Fab, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Button, Icon, Tabs, Tab, TabHeading, } from 'native-base';
import About from '../components/About';
import Connections from '../components/Connections';
import Posts from '../components/Posts';

import { Text } from '../components/Text';
import Micon from '../components/Micon';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import Colors from '../constants/Colors';
import { Bitmoji } from '../components/Bitmoji';
export default class Mentor extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={{
                        maxWidth: 60,
                        position: 'absolute',
                        zIndex: 1,
                        left: 25,
                        top: Header.HEIGHT - 20,

                    }}
                    onPress={() => { this.props.navigation.goBack(null); }}
                >
                    <Micon name='arrow-left' style={{ flex: 1 }} color='#fff' />
                </TouchableOpacity>
                <ImageBackground source={require('../assets/images/profile.jpeg')} style={styles.top} >
                <Button iconLeft onPress={() => this.signup(true)} light style={{ flex: 1 }}>
                         <Micon name='check' color='rgb(85,116,247)' />
            <Text style={{ color: 'rgb(85,116,247)' }}>Mentor</Text>
                         </Button>
                </ImageBackground>
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
    top: {
        width: null,
        height: null,
        flex: 0.3,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});
