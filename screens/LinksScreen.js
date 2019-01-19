import React from 'react';
import { ScrollView, StyleSheet, View, ImageBackground, NativeModulesStatic, Modal, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { Text, ListItem, Left, Right, Radio, Card, CardItem, Body, Textarea, Button, Toast } from 'native-base';
import { Icon, ImagePicker } from 'expo';
import ProfileCards from '../components/ProfileCards';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
 state = { choice: null, showmore: false, photos: [], imageBrowserOpen: false, mentor: false, mentee: false }
 topic = async() => {
  this.setState({ showmore: true });
}
 pickimage = async() => {
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
    if (this.state.choice) {
      return <ProfileCards type={this.state.choice} emptyChoice={this.setChoice} />;
    } 
    return (
      <View style={styles.container}>
      <TouchableOpacity style={{ flex: 2, padding: 10 }} onPress={() => this.setState({ mentor: !this.state.mentor })}>
       <ImageBackground
source={require('../assets/images/teach.jpeg')} style={{ flex: 1, height: null, width: null }}
       >  
         {/* <View style={styles.overlay} />
<View>
  <Text style={styles.title}>Find Friends who will be your Sensei : they will guide, motivate and sometimes teach. It is free of cost! In return, all you need to do is teach someone new something you know!</Text>
</View> */}
      </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 2, padding: 10 }} onPress={() => this.setState({ mentee: !this.state.mentee })}>
      <ImageBackground
source={require('../assets/images/learn.jpeg')} style={{ flex: 1, height: null, width: null }}
      >  
         {/* <View style={styles.overlay} />
<View>
  <Text style={styles.title}>Find Friends who will be your Sensei : they will guide, motivate and sometimes teach. It is free of cost! In return, all you need to do is teach someone new something you know!</Text>
</View> */}
      </ImageBackground>
      </TouchableOpacity>
      {/* <View style={{ flex: 2 }}>
      <ListItem>
            <Left>
              <Text>Be a Mentor - Teach something</Text>
            </Left>
            <Right>
              <Radio selected={this.state.mentor} onPress={() => this.setState({ mentor: !this.state.mentor, mentee: !this.state.mentee })} />
            </Right>
          </ListItem>
           <ListItem>
            <Left>
              <Text>Be a Mentee - Learn something</Text>
            </Left>
            <Right>
              <Radio selected={this.state.mentee} onPress={() => this.setState({ mentee: !this.state.mentee, mentor: !this.state.mentor })} />
            </Right>
          </ListItem>
          </View> */}
     
      <Modal
          animationType='slide'
          onRequestClose={() => this.setState({ mentor: false })}
          transparent
          visible={this.state.mentor}
      > 
          <View style={{ flex: 1, justifyContent: 'center', padding: 15, backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <ImageBackground source={require('../assets/images/mentor.jpeg')} style={{ padding: 20, backgroundColor: '#fff', borderRadius: 5 }}>
          <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid keyboardOpeningTime={50}>


              {this.state.showmore ? null : 
          
          <Card>
          <CardItem header >
          <Text style={{ fontSize: 17, color: '#000', fontWeight: 'bold' }}>Select a Topic</Text>
      </CardItem>
      <CardItem>
      <Button full light onPress={this.topic} style={{ flex: 1, }}>
      <Text>Guitar</Text>
    </Button>
       </CardItem>
       <CardItem>
       <Button full light onPress={this.topic} style={{ flex: 1, }}>
      <Text>Emotional Intelligence</Text>
    </Button>
       
      </CardItem>
      <CardItem>
      <Button full light onPress={this.topic} style={{ flex: 1, }}>
      <Text>Programming</Text>
    </Button>
     
      </CardItem>
      <CardItem>
        
      <Button full light onPress={this.topic} style={{ flex: 1, }}>
      <Text>Writing</Text>
    </Button>
     
      </CardItem>
      <CardItem>
      <Button full light onPress={this.topic} style={{ flex: 1, }}>
      <Text>Entreprenuer</Text>
    </Button>
    
      </CardItem>
     </Card>
              }
           {this.state.showmore ?
            
              <Card >
          <CardItem header bordered >
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#000' }}>Describe your Expertise</Text>
            </CardItem>
            <CardItem button onPress={this.pickimage}>
                 {this.state.imageBrowserOpen ? <ActivityIndicator /> : <Icon.Ionicons
                  size={22}
        name="md-cloud-upload"
                 />}
            <Text>{' '}Upload Picture</Text> 
          
           
            </CardItem> 
            <CardItem>
              <Body>
              <Textarea rowSpan={6} placeholder="I am a guitarist with 6 years of exp. I can teach you chords, new songs with the combination of YouTube/apps and personal assistance. I am available every weekend and on weekdays from _ to _ . I take beginners. I can teach you to play in 15 session" />
              </Body>
            </CardItem>
          
            <CardItem footer>
            <Body>
               <Button block danger onPress={() => { this.setState({ mentor: false, choice: 'mentor' }); }}>
            <Text>Save</Text>
          </Button>   
            </Body>
                    
           
            </CardItem>
          </Card>
         : null}
            </KeyboardAwareScrollView>
            </ImageBackground>
          </View>
        </Modal>
   
          <Modal
          animationType='slide'
          onRequestClose={() => this.setState({ mentee: false })}
          transparent
          visible={this.state.mentee}
          > 
          <View style={{ flex: 1, justifyContent: 'center', padding: 15, backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <ImageBackground source={require('../assets/images/mentor.jpeg')} style={{ padding: 20, backgroundColor: '#fff', borderRadius: 5 }}>
          <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid keyboardOpeningTime={50}>


              {this.state.showmore ? null : 
          
              <Card>
                <CardItem header >
                <Text style={{ fontSize: 17, color: '#000', fontWeight: 'bold' }}>Select a Topic you want to Learn</Text>
            </CardItem>
            <CardItem cardBody>
            <Button full light onPress={this.topic} style={{ flex: 1, }}>
            <Text>Mental State</Text>
          </Button>
             </CardItem>
             <CardItem cardBody>
             <Button full light onPress={this.topic} style={{ flex: 1, }}>
            <Text>Emotional Intelligence</Text>
          </Button>
             
            </CardItem>
            <CardItem cardBody>
            <Button full light onPress={this.topic} style={{ flex: 1, }}>
            <Text>Programming</Text>
          </Button>
           
            </CardItem>
            <CardItem cardBody>
              
            <Button full light onPress={this.topic} style={{ flex: 1, }}>
            <Text>Writing</Text>
          </Button>
           
            </CardItem>
            <CardItem cardBody>
            <Button full light onPress={this.topic} style={{ flex: 1, }}>
            <Text>Entreprenuer</Text>
          </Button>
          
            </CardItem>
           </Card>
              }
           {this.state.showmore ?
            
              <Card >
          <CardItem header bordered >
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#000' }}>Message to a Mentor</Text>
            </CardItem>
            <CardItem>
              <Body>
              <Textarea rowSpan={6} placeholder="I have been trying to play the guitar for 1 year. I need motivation and consistent guidance. I want to get better really quickly. I am a mature beginner" />
              </Body>
            </CardItem>
           
            <CardItem footer>
            <Body>
               <Button block danger onPress={() => { this.setState({ mentee: false, choice: 'mentee' }); }}>
            <Text>Save</Text>
          </Button>   
            </Body>
                    
           
            </CardItem>
          </Card>
         : null}
            </KeyboardAwareScrollView>
            </ImageBackground>
          </View>
        </Modal>

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
