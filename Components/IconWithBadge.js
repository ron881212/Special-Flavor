import React from 'react'
import { Text, View } from 'react-native'
import firebase from 'react-native-firebase' 
import Ionicons from 'react-native-vector-icons/FontAwesome5'
import { Icon, withBadge, Badge } from 'react-native-elements'
import MerchScreen from '../screens/Merch'

class IconWithBadge extends React.Component {
constructor(props){
  super(props)
  this.state = {
    messages: 0
  } 
}
componentDidMount(){
  this.mounted = false
  this.userID = firebase.auth().currentUser.uid
  this.ref = firebase.firestore().collection('Users').doc(this.userID)
  this.ref.onSnapshot(unread => {
    if(!this.mounted){
      this.setState(prevState => {
        console.tron.log('message', unread._data.Messages)
        return {messages: unread._data.Messages}
      })
    }
  })
}
componentWillUnmount(){
    this.mounted = true
}
// dark(){
//   let message;
//   function check() {
//     // return true
//     this.ref.onSnapshot(unread => {
//       console.tron.log('message1', unread._data.Messages)
//       if(unread._data.Messages > 0){
//         return true
//       }
//     })
//   }

  // console.tron.log('message2', message)
  // console.tron.log('state', this.state.messages)
  
  // if(check() > 0) return 'Order'
  // else return 'Comments'
// }
render() {
  const { name, badgeCount, color, size } = this.props
  return (
    <View style={{ width: 30, height: 24, margin: 5 }}>
      <Ionicons name={this.state.messages > 0 ? 'comment' : 'comments'} size={size} color={color} />
      { this.state.messages > 0 ? 

      <Badge 
          value={ this.state.messages } 
          status="primary"
          containerStyle={{ position: 'absolute', top: -3, right: -6}}
      /> 

      : null }
    </View>
  )
}
}

IconWithBadge.shared = new IconWithBadge()

export default IconWithBadge