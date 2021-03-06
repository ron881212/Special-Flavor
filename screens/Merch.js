import React from 'react'
import { View, SafeAreaView, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'react-native-firebase' 
import Fire from '../Components/Fire'
import Picture from '../images/IMG_1225.jpeg'
import { withNavigation } from 'react-navigation'

class MerchScreen extends React.Component {
  constructor(){
    super()
    this.userID = firebase.auth().currentUser.uid
    this.emailRef = firebase.firestore().collection('Users').doc(this.userID)
    this.state = {
      messages: [],
      userName: '',
      avatar: null,
      anon: false
    }
  }

  componentDidMount() {
    // console.tron.log('here', MerchScreen.)
    this.mounted = false
    const email = firebase.auth().currentUser.email  
    const userID = firebase.auth().currentUser.uid 
    this.ref = firebase.firestore().collection('Users').doc(userID)
    var avatarRef = firebase.storage().ref(`${userID}/images`)

    !firebase.auth().currentUser.isAnonymous ?

      avatarRef.getDownloadURL().then( url => {
        if(!this.mounted){
          this.setState({
            avatar: url
          })
        }
        }).catch( () => {
          this.setState({
            avatar: 'https://placeimg.com/140/140/any'
          })
        })
      :
      this.setState({
        avatar: 'https://placeimg.com/140/140/any',
        anon: true
      })

      this.emailRef.onSnapshot(userInfo => {
        if(!this.mounted){
          !this.state.anon ?
          this.setState({userName: userInfo._data.userName}) 
          :
          this.setState({ userName: 'guest'})
        }
      })

      if(!this.mounted){
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
      }
      Fire.shared.on(message => {
        if(!this.mounted){
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
        }))
        }
      })
  }

  componentWillUnmount(){
    this.mounted = true
  } 

  get user(){
    return {
      // avatar will be here and is pulled from profile
      name: this.state.userName,
      _id: Fire.shared.uid,
      avatar: this.state.avatar
    }
  }

  get anonUser(){
    return {
      // avatar will be here and is pulled from profile
      name: 'guest',
      _id: '10',
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
        onSend={Fire.shared.send}
        user={!this.state.anon ? this.user: this.anonUser}
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        minInputToolbarHeight={-5}
        listViewProps={{marginBottom:50}}
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
    backgroundColor:'purple',
    resizeMode: 'cover',
  }
})

export default withNavigation(MerchScreen)