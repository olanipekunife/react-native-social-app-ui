import React from 'react';
import { ScrollView, StyleSheet, View, ImageBackground, NativeModulesStatic, Modal, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { Text as Ntext, ListItem, Left, Right, Radio, Card, CardItem, Body, Textarea, Button, Toast } from 'native-base';
import { Header } from 'react-navigation';

import { Icon, ImagePicker } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../constants/Colors';
import { Text } from '../components/Text';

export default class LinksScreen extends React.Component {
  // static navigationOptions = {
  //   header: null,
  // };
  // static navigationOptions = ({ navigation }) => ({
  //   headerTitle: 'Pick a Lane',
  //   headerStyle: {
  //     backgroundColor: Colors.noticeText,
  //     elevation: 0, 
  //   },
  //   headerTintColor: Colors.sky2,
  //   headerTitleStyle: {
  //     fontFamily: 'gibson',
  //     fontWeight: 'normal',
  //   },
  // });
  state = { choice: null, showmore: false, photos: [], imageBrowserOpen: false, mentor: false, mentee: false }
  topic = async () => {
    this.setState({ showmore: true });
  }
  pickimage = async () => {
    this.setState({ imageBrowserOpen: true });
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images'
    });
    this.setState({ imageBrowserOpen: false });
    console.log(result);
  }
  setChoice = (choice) => {
    this.setState({ choice });
  }
  render() {
    // if (this.state.choice) {
    //   return <ProfileCards type={this.state.choice} emptyChoice={this.setChoice} />;
    // }
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: Header.HEIGHT - 20, textAlign: 'center', color: Colors.sky, fontSize: 20 }}>Pick a Lane</Text>

        {/* <TouchableOpacity style={{ flex: 0.425, paddingHorizontal: 20, marginTop: 30 }} onPress={() => this.setState({ mentor: !this.state.mentor })}> */}
        <TouchableOpacity style={{ flex: 0.425, paddingHorizontal: 20, marginTop: 30 }} onPress={() => { this.props.navigation.navigate('Mentor'); }}>
          <View
            style={{
              flex: 1,
              borderColor: '#ccc',
              borderWidth: 1,
              elevation: 2,
              justifyContent: 'space-around'
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 30 }}>MENTOR</Text>
            <Ntext style={{ textAlign: 'center', fontFamily: 'Highlander', fontSize: 30 }}>Teach What You Know</Ntext>

          </View>
        </TouchableOpacity>
        <View style={{ flex: 0.15, justifyContent: 'center' }}>
          <Ntext style={{ textAlign: 'center', fontFamily: 'Highlander', fontSize: 25, color: '#ccc' }}>TO</Ntext>
        </View>
        <TouchableOpacity style={{ flex: 0.425, paddingHorizontal: 20, marginBottom: 30 }} onPress={() => this.props.navigation.navigate('Mentee')}>
      <View
          style={{
            flex: 1,
            borderColor: '#ccc',
            borderWidth: 1,
            elevation: 2,
            justifyContent: 'space-around'
          }}
      >
          <Text style={{ textAlign: 'center', fontSize: 30 }}>MENTEE</Text>
          <Ntext style={{ textAlign: 'center', fontFamily: 'Highlander', fontSize: 30 }}>LEARN WHAT YOU DONT</Ntext>
        </View>
      </TouchableOpacity>
   
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
    backgroundColor: '#DF001D',
    opacity: 0.5
  },
  title: {
    fontSize: 17,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center'

  },
});
