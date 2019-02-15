import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } 
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {/* <StatusBar hidden /> */}
          <StatusBar barStyle="light-content" />

          <AppNavigator />
        </View>
      );
  }

  _loadResourcesAsync = async () => Promise.all([
      Asset.loadAsync([
       
        require('./assets/images/bg1.jpg'),  
        require('./assets/images/bg2.jpg'),
        require('./assets/images/bg3.jpg'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
      //  ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        gibson: require('./assets/fonts/Gibson-Regular.otf'),
        Highlander: require('./assets/fonts/Highlander.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),

      }),
    ]);

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
