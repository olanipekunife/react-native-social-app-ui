import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity, ImageBackground, Platform, AsyncStorage, ActivityIndicator, ToastAndroid } from 'react-native';
import { LinearGradient } from 'expo';
import { Header } from 'react-navigation';
import { Container, Content, List, Fab, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Button, Icon, Tabs, Tab, TabHeading, Textarea } from 'native-base';
import About from '../components/About';
import Connections from '../components/Connections';
import Posts from '../components/Posts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ip from '../constants/Ip';
import axios from 'axios';

import { Text } from '../components/Text';
import Micon from '../components/Micon';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import Colors from '../constants/Colors';
import { Bitmoji } from '../components/Bitmoji';
export default class Mentor extends Component {
    state={ text: '', category: 'photography', load: false, userid: '', pic: 'https://via.placeholder.com/800', name: '' }
    async componentDidMount() {
        this.setState({ load: true });
        const stat = JSON.parse(await AsyncStorage.getItem('user'));
        this.setState({ userid: stat._id, load: false, pic: stat.pic, name: stat.name, category: stat.category });
        //navigation.getParam('itemId', 'NO-ID');
      }
    creatementor = () => {
        this.setState({ load: true });
        axios({
          url: `http://${Ip.ip}:4001/mentor`,
          method: 'post',
          data: { ...this.state, user: this.state.userid }
        }).then(async ({ data }) => {
            this.setState({ load: false });
    
          console.log(data);
          ToastAndroid.show('You are ready to receive requests from mentees now', ToastAndroid.SHORT);
        }).catch(err => {
          console.log(err.response);
        });
    }
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
                <ImageBackground source={{ uri: this.state.pic }} style={styles.top} >
                    <View style={styles.overlay} />
                    <Text style={styles.name}>{this.state.name}</Text>
                    <Text style={styles.work}>{this.state.category}</Text>
                    <Button iconLeft light style={{ borderRadius: 5, alignSelf: 'center', padding: 20, marginVertical: 15 }}>

                        <Micon name='check' color='rgb(85,116,247)' />
                        <Text style={{ color: 'rgb(85,116,247)' }}>Mentor</Text>
                    </Button>
                </ImageBackground>
                <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid keyboardOpeningTime={50} extraHeight={Platform.select({ android: 100 })} style={styles.bottom}>
                {/* <View style={} > */}
                    <View style={{ marginLeft: 20, marginVertical: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 19 }}>Description</Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Textarea maxLength={80} style={{ fontFamily: 'gibson', fontSize: 16, fontWeight: 'bold' }} onChangeText={(text) => this.setState({ text })} rowSpan={3} placeholder="Tell us About your Skill" />
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'rgba(128, 202, 255, 0.1)', marginTop: 10, paddingTop: 20, justifyContent: 'flex-end', height: '100%' }}>
                        <Text style={{ textAlign: 'center', }}>CATEGORIES</Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.9, flexDirection: 'row', paddingVertical: 20, paddingHorizontal: 15 }}>
                            <TouchableOpacity style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 5, paddingVertical: 15, paddingHorizontal: 15, marginRight: 10, width: 102 }}>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ width: 40, height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, backgroundColor: '#ccc', marginVertical: 15 }}>
                                     <Image blurRadius={5} resizeMode='contain' style={{ flex: 1 }} source={{ uri: Bitmoji() }} />
                                     </View>
                                   
                                    <Text style={{ textAlign: 'center', marginBottom: 15, fontSize: 13 }}>Photography</Text>
                                </View>
                                <View style={{ borderTopWidth: 1, borderTopColor: '#ccc', }}>
                                <Text style={{ textAlign: 'center', color: Colors.sky, fontSize: 13, marginTop: 4 }}>TEACH</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'space-around', backgroundColor: '#fff', borderRadius: 5, paddingVertical: 15, paddingHorizontal: 15, marginRight: 10, width: 102 }}>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ width: 40, height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, backgroundColor: '#ccc', marginVertical: 15 }}>
                                     <Image blurRadius={5} resizeMode='contain' style={{ flex: 1 }} source={{ uri: Bitmoji() }} />
                                     </View>
                                   
                                    <Text style={{ textAlign: 'center', marginBottom: 15, fontSize: 13 }}>Guitar</Text>
                                </View>
                                <View style={{ borderTopWidth: 1, borderTopColor: '#ccc', }}>
                                <Text style={{ textAlign: 'center', color: Colors.sky, fontSize: 13, marginTop: 4 }}>TEACH</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {this.state.load ?
                           <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center', alignItems: 'flex-start' }}>
                           <ActivityIndicator style={{ alignSelf: 'center', textAlign: 'center' }} size="small" color='#000' />
                          </TouchableOpacity>
                        
                          : <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center', alignItems: 'flex-start' }} onPress={() => { this.creatementor(); }}>
                          <Micon name='arrow-right' />
                         </TouchableOpacity>}
                     
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
        backgroundColor: '#fff'
    },
    top: {
        flex: 0.49,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    bottom: {
        flex: 0.51,

    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#000',
        opacity: 0.2
    },
    work: {
        fontSize: 15,
        color: '#fff',
    },

    name: {
        color: 'white',
        fontSize: 16,
        marginBottom: 4
    },
});
