import React, { Component } from 'react';
import { Image, View, Alert, AsyncStorage } from 'react-native';
import { Container, Header, DeckSwiper, Title, Right, Card, Toast, CardItem, Thumbnail, Left, Body, Button, Content } from 'native-base';
import { Bitmoji } from '../components/Bitmoji';
import { Text } from '../components/Text';

export const About = (props) => (
    <View style={{ flex: 1, marginTop: 20 }}>
     <Text style={{ fontSize: 20, marginBottom: 10, color: '#49556c', lineHeight: 24 }}>{props.head}</Text>
<Text style={{ color: '#777e8a', lineHeight: 24 }}>{props.bio}</Text>
      </View>
)

