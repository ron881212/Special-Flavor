import React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import firebase from 'react-native-firebase' 
import Ionicons from 'react-native-vector-icons/FontAwesome5'
import { Icon, withBadge, Badge } from 'react-native-elements'
import Fire from '../Components/Fire'
import { withNavigation } from 'react-navigation'

class UserWithBadge extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      messages: false
    } 
    this.userID = firebase.auth().currentUser.uid
    this.ref = firebase.firestore().collection('Users').doc(this.userID)
  }
  async componentDidMount(){
    this.mounted = false
    // this.setState({messages: true})
    // this.a()
    const getUsers = await firebase.firestore().collection('Users').get()
      getUsers.docs.forEach( doc => {
        let getCount = firebase.firestore().collection('Users').doc(doc._ref._documentPath._parts[1])
        getCount.onSnapshot(current => {
          if(current._data.Count) {
            this.setState({messages: true})
          }
          else this.setState({messages: false})
        })
      })
  }

  componentWillUnmount(){
    this.mounted = true
  }

  clearUID(){
    this.props.navigation.goBack();
    // console.tron.log(this.state.messages)
    Fire.customUid = null;
    // console.tron.log('Fire.customUid ',Fire.customUid)
    this.props.navigation.navigate('Users')
  }
  
  render() {
    const { name, badgeCount, color, size } = this.props
    return (
      <View style={{ width: 30, height: 24, margin: 5 }}>
        <Ionicons name="users" size={size} color={color} 
          onPress={()=> this.clearUID()}
        />
        { this.state.messages ? 
  
        <Badge 
            // value='unread'
            status="primary"
            containerStyle={{ position: 'absolute', top: -3, right: -6}}
            onPress={()=> this.clearUID()}
            
        /> 
  
        : null }
      </View>
    )
  }
}

export default withNavigation(UserWithBadge)