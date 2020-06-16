import React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import firebase from 'react-native-firebase' 
import Ionicons from 'react-native-vector-icons/FontAwesome5'
import { Icon, withBadge, Badge } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import MerchScreen from '../screens/Merch'

class IconWithBadge extends React.Component {
constructor(props){
  super(props)
  this.state = {
    messages: 0
  } 
  this.userID = firebase.auth().currentUser.uid
  this.ref = firebase.firestore().collection('Users').doc(this.userID)
  this.phone = firebase.firestore().collection('Users').doc(this.userID).collection('Phone')
}
componentDidMount(){
  this.mounted = false
  // const phone = this.phone.get()
  // phone.
  if(this.phone > 0){
    this.ref.onSnapshot(unread => {
    // let data = unread._data.Messages
    if(!this.mounted){
      this.setState(prevState => {
        console.tron.log('unread._data.Messages ',unread._data.Messages)
        return {messages: unread._data.Messages}
    })
    }
  })
  }
  
}
componentWillUnmount(){
  this.mounted = true
}

changeScreen(){
  console.tron.log('state.message ', this.state.messages)
  if(this.state.messages > 0){
    this.props.navigation.navigate('Customer')
  }
  else this.props.navigation.navigate('Boards')
}

render() {
  const { name, badgeCount, color, size } = this.props
  return (
    <View style={{ width: 30, height: 24, margin: 5 }}>
      <Ionicons name={this.state.messages > 0 ? 'comment' : 'comments'} size={size} color={color} 
        onPress={()=> this.changeScreen()}
      />
      { this.state.messages > 0 ? 

      <Badge 
          value={ this.state.messages } 
          status="primary"
          containerStyle={{ position: 'absolute', top: -3, right: -6}}
          onPress={()=> this.changeScreen()}
      /> 

      : null }
    </View>
  )
}
}

IconWithBadge.shared = new IconWithBadge()

export default withNavigation(IconWithBadge)