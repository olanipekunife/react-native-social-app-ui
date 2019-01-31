import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, ImageBackground, NativeModulesStatic, Modal, ActivityIndicator, Platform, FlatList, AsyncStorage } from 'react-native';
import { List, Thumbnail, Text, ListItem, Left, Right, Radio, Card, CardItem, Body, Textarea, Button, Toast } from 'native-base';
import { Icon, ImagePicker } from 'expo';
import ProfileCards from '../components/ProfileCards';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import Colors from '../constants/Colors';

const json = require('../assets/categories.json');

export default class Categories extends Component {
  static navigationOptions = {
    header: null,
  };
  state = { category: 'Photography', load: false }

  signup = () => {
    this.setState({ load: true });
    axios({
      url: 'http://192.168.8.101:4001/signup',
      method: 'post',
      data: { ...this.props.navigation.state.params, ...this.state }
    }).then(async ({ data }) => {
      console.log(data);
       await AsyncStorage.setItem('user', JSON.stringify(data));
      this.props.navigation.navigate('Main');
    }).catch(err => {
      console.log(err.response);
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
  }
  renderItem = ({ item }) => (
    <ListItem avatar style={{ flexDirection: 'column' }}>

      <Thumbnail source={{ uri: item.image }} />
      <Text style={{ textAlign: 'center' }} note>{item.name}</Text>
    </ListItem>
  );
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: '30%' }}>
          <ImageBackground
            source={require('../assets/images/frensei.jpeg')}
            style={{ flex: 1, paddingHorizontal: 15, justifyContent: 'center' }}
          >
            <View style={styles.overlay} />
            <Text style={styles.title}>Categories</Text>
          </ImageBackground>
        </View>
        <ScrollView style={styles.container}>
          <Card style={{ paddingBottom: 20 }}>
            <ListItem itemHeader style={{ paddingBottom: 10 }}>
              <Text style={{ fontSize: 19, color: '#000', fontWeight: '600', }}>Entertainment</Text>
            </ListItem>
            <FlatList
              data={json}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            /></Card>
          <Card style={{ paddingBottom: 20 }}>
            <ListItem itemHeader style={{ paddingBottom: 10 }}>
              <Text style={{ fontSize: 19, color: '#000', fontWeight: '600', }}>TV Shows</Text>
            </ListItem>
            <FlatList
              data={json}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            /></Card>
          <Card style={{ paddingBottom: 20 }}>
            <ListItem itemHeader style={{ paddingBottom: 10 }}>
              <Text style={{ fontSize: 19, color: '#000', fontWeight: '600', }}>Fun &amp; Games</Text>
            </ListItem>
            <FlatList
              data={json}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            /></Card>
          {this.state.load ?
            <Button full light>
              <ActivityIndicator style={{ alignSelf: 'center', textAlign: 'center' }} size="small" color={Colors.sky2} />
            </Button>
            : <Button full light iconRight onPress={this.signup}>
              <Text>LETS GO</Text>
              <Icon.Ionicons
                name='md-done-all'
                size={26}
              />
            </Button>}
       
        </ScrollView>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#000',
    opacity: 0.5
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'

  },
});

