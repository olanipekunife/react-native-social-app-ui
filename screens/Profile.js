import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import StarRating from 'react-native-star-rating';

import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';

const star = require('../assets/images/star.png')
const MIN_HEIGHT = 180;
const MAX_HEIGHT = 350;

const styles = StyleSheet.create({
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  keywords: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  keywordContainer: {
    backgroundColor: '#999999',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  keyword: {
    fontSize: 18,
    color: '#ccc',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom:25
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    height: 600,
  },
});
class Profile extends Component {
    static navigationOptions = {
        header: null,
      };
    constructor() {
      super();
      this.state = { showNavTitle: false, blur:0 };
    }
  
    render() {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <HeaderImageScrollView
            maxHeight={MAX_HEIGHT}
            minHeight={MIN_HEIGHT}
            maxOverlayOpacity={0.6}
            minOverlayOpacity={0.3}
            fadeOutForeground
            renderHeader={() => <Image blurRadius={this.state.blur} source={require('../assets/images/profile.jpeg')} style={styles.image} />}
            renderFixedForeground={() => (
              <Animatable.View
                style={styles.navTitleView}
                ref={navTitleView => {
                  this.navTitleView = navTitleView;
                }}
              >
                <Text style={styles.navTitle}>
                  Stephanie Cole, (2001)
                </Text>
              </Animatable.View>
            )}
            renderForeground={() => (
              <View style={styles.titleContainer}>
                <Text style={styles.imageTitle}>Stephanie Cole</Text>
                <Text note style={styles.keyword}>New York</Text>
                <StarRating
        disabled
        maxStars={5}
        rating={4}
        starSize={14}
        fullStarColor='#fff'
      //  selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
              </View>
            )}
          >
            <TriggeringView
              style={styles.section}
              onHide={() => {this.setState({blur:5});this.navTitleView.fadeInUp(200);}}
              onDisplay={() => {this.setState({blur:0});this.navTitleView.fadeOut(100);}}
            >
              <Text style={styles.title}>
                <Text style={styles.name}>Stephanie Cole</Text>, (2009)
              </Text>
            </TriggeringView>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.sectionContent}>oskdoskd</Text>
            </View>
            <View style={[styles.section, styles.sectionLarge]}>
              <Text style={styles.sectionTitle}>Keywords</Text>
              {/* <View style={styles.keywords}>
                {tvShowContent.keywords.map(keyword => (
                  <View style={styles.keywordContainer} key={keyword}>
                    <Text style={styles.keyword}>{keyword}</Text>
                  </View>
                ))}
              </View> */}
            </View>
          </HeaderImageScrollView>
        </View>
      );
    }
  }
  
  export default Profile;