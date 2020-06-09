import React from 'react'
import { Text, View } from 'react-native'
import firebase from 'react-native-firebase' 
// import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/FontAwesome5'
import { Icon, withBadge, Badge } from 'react-native-elements'

class IconWithBadge extends React.Component {
constructor(props){
  super(props)
  this.userID = firebase.auth().currentUser.uid
  this.ref = firebase.firestore().collection('Users').doc(this.userID)
  this.state = {
    messages: 0
  } 
}
componentDidMount(){
  this.ref.onSnapshot(unread => {
    // console.tron.log('unread', unread)
    this.setState(prevState => {
      return {messages: unread._data.Messages}
    })
  })
}
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

export default IconWithBadge