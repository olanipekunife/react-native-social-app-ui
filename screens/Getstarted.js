import React from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, ImageBackground, TouchableHighlight, TouchableOpacity, AsyncStorage, StatusBar } from 'react-native';
import Carousel from 'react-native-carousel-view';
import { Button, Text } from 'native-base';
import { Icon } from 'expo';
import Buttonnextwhite from '../components/Buttonnextwhite';

const Getstarted = ({ navigation }) => (

    <View style={styles.container}>
     <StatusBar hidden />
      <Carousel
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height}
        delay={4000}
        //hideIndicators
        inactiveIndicatorColor="grey"
        //indicatorAtBottom
        //indicatorSize={20}
        indicatorColor="red"
      >
      <View style={styles.container}>
      <ImageBackground style={styles.container} source={require('../assets/images/bg3.jpg')} /> 
      {/* <View style={styles.top}>
          <ImageBackground style={styles.container} source={require('../assets/images/onboard.jpg')} /> 
        </View>
      
          <View style={styles.bottom}>
            <Text style={styles.contenttitle} >Find Friends who will be your Sensei</Text>
            <Text style={styles.contenttitlesub}>lorem lorem </Text>

            <View >
            <BrandButton
            title='GET STARTED'
            action={() => { navigation.navigate('Signup'); }}
            />
            </View>
          </View> */}
        </View>
      <View style={styles.container}>
      <ImageBackground style={styles.container} resize source={require('../assets/images/bg1.jpg')} /> 
      {/* <View style={styles.top}>
          <ImageBackground style={styles.container} source={require('../assets/images/onboard1.png')} /> 
        </View>
          <View style={styles.bottom}>
            <Text style={styles.contenttitle} >Mentors </Text>
            <Text style={styles.contenttitlesub}>lorem lorem </Text>

            <View >
            <BrandButton
            title='GET STARTED'
            action={() => { navigation.navigate('Signup'); }}
            />
            </View>
          </View> */}
        </View>
     
      <View style={styles.container}>
      <View style={styles.top}>    
        <ImageBackground style={styles.container} resizeMethod='scale' source={require('../assets/images/bg2.jpg')} /> 

          {/* <ImageBackground style={styles.container} source={require('../assets/images/onboard4.png')} />  */}
        </View>
          <View style={[styles.bottom, { paddingHorizontal: 15, backgroundColor: 'grey', justifyContent: 'center' }]}>
            {/* <Text style={styles.contenttitle} >Private Chats</Text>
            <Text style={styles.contenttitlesub}>lorem lorem </Text> */}

<TouchableOpacity
style={styles.checkbox}
                          onPress={() => navigation.navigate('Signup')
                          }
>
                          <Buttonnextwhite /> 
                  </TouchableOpacity>
          
            {/* </View> */}
          </View>
        </View>
      </Carousel>
      
      
   </View>
  );
const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
    width: null,
height: null
},
top: {
  height: '90%',
  backgroundColor: 'white',
},
bottom: {
  height: '10%',
  //height: '50%',
//  backgroundColor: '#db0036',
  //justifyContent: 'flex-start',
  //alignItems: 'center',
  //flexDirection: 'column',
  //paddingTop: 30,
  //paddingHorizontal: 30
},
hold: {
  flex: 1
},
title: {
  fontSize: 30,
  color: 'white',
  alignSelf: 'center',
  marginBottom: 15
},
subtitle: {
  fontSize: 20,
  color: 'white',
  alignSelf: 'center',
  lineHeight: 25,
  fontWeight: '200'
},
bo: {
  flex: 2,
  justifyContent: 'center',
  flexDirection: 'column'
},
bo1: {
  flex: 1,
},
button1: {
  borderWidth: 1,
  paddingTop: 15,
  paddingBottom: 15,
  padding: 15,
  borderRadius: 8,
  borderColor: '#d66c04',
  backgroundColor: 'white',
  alignSelf: 'center',
  shadowColor: '#d66c04',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 8,
  marginTop: 15,
},
checkbox: {
  alignItems: 'flex-end',
},
whiteloan: {
  color: '#f27700',
  fontSize: 14,
  fontWeight: 'bold'
},
contentContainer: {
 
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
contenttitle: {
  fontSize: 20,
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 15,
},
contenttitlesub: {
  fontSize: 19,
  color: 'white',
  textAlign: 'center',
  
},
});

export default Getstarted;

