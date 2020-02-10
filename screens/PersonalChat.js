import React, {useState} from 'react'
import { View, SafeAreaView, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'react-native-firebase' 
import Fire from '../Components/Fire'
import Picture from '../images/IMG_1225.jpeg'

export default class MerchScreen extends React.Component {
  constructor(){
    super()
    this.userID = firebase.auth().currentUser.uid
    this.emailRef = firebase.firestore().collection('Users').doc(userID)
  }
  state = {
    messages: [],
    userName: '',
    avatar: null
  }
  
  componentDidMount() {
    const email = firebase.auth().currentUser.email  
    this.ref = firebase.firestore().collection('Users').doc(this.userID)
    // userID = firebase.auth().currentUser.uid 
    // Fire.customUid = this.userID;
    var avatarRef = firebase.storage().ref(`${this.userID}/images`)
    avatarRef.getDownloadURL().then( url => {
        this.setState({
          avatar: url
        })
    }).catch( () => {
        this.setState({
          avatar: 'https://placeimg.com/140/140/any'
          })
    })
    this.emailRef.onSnapshot(userInfo => {
      this.setState({
        userName: userInfo._data.userName || 'anonymous',
      })
    })

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hey yall',
          user: {
            _id: 2,
            name: 'Admin',
            avatar: Picture,
          },
        },
      ],
    })
    Fire.shared.on2(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    )
  }

  get user(){
    return {
      // avatar will be here and is pulled from profile
      name: this.state.userName,
      _id: Fire.shared.uid,
      avatar: this.state.avatar
    }
  }

  render() {

  return (
    <SafeAreaView style={styles.container}> 
      <ImageBackground
        source={require('../images/SpecialFlavorsLogo.png')} 
        style={styles.backgroundStyle}
      >
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send2}
        user={this.user}
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
      />
      </ImageBackground>
    </SafeAreaView>
  )
  }
}
const sectionWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input:{
    display: 'flex',
    flexDirection: 'row',
    width: sectionWidth / 1.5,
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    justifyContent: 'center',
  },
  backgroundStyle:{
    flex: 1,
    backgroundColor:'#2a5e9f',
    resizeMode: 'cover',
  }
})