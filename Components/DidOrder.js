import React from 'react' 
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native' 
import firebase from 'react-native-firebase' 
import Fire from '../Components/Fire'
import { Card, Avatar, ListItem, Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

class DidOrder extends React.Component {

  componentDidMount(){
    this.a()
  }
  
  handleChat = (userUID, cb) => {
    // this function will take in the user uid and navitgate to the
    Fire.customUid = null;
    Fire.customUid = userUID;
    // console.log(Fire.customUid)
    cb()
  }

  a = async () => {
    // Expected to loop thru all user counts
    const getUsers = await firebase.firestore().collection('Users').get()
      getUsers.docs.forEach( doc => {
        let getCount = firebase.firestore().collection('Users').doc(doc._ref._documentPath._parts[1])
        getCount.onSnapshot(current => {
          this.props.updateCount(current._ref._documentPath._parts[1], current._data.Count)
        })
      })
  }

  render() {
    return (
      this.props.count > 0 ?
        <TouchableOpacity
        // Navigates to the same screen but the chat changes to the user
        onPress={()=> {
          this.props.handleChat(this.props.userUID, this.props.nav);
          // Fire.usersUid = this.props.userUID
          // console.tron.log('Fire.usersUid ',Fire.usersUid )
        }}
        >
        <ListItem
          containerStyle={{width: sectionWidth / 1.1}}
          leftAvatar={
            <Avatar
            rounded
            size={50}
            source={{uri: this.props.userAvatar}}
            renderPlaceholderContent={<ActivityIndicator />}
            />
            }
          title={this.props.name}
          subtitle={this.props.address}
          // rightSubtitle={l.users.phone}
          badge={
            { value: this.props.count, textStyle: { color: 'white', fontSize: 20 },status:"primary", badgeStyle: {borderRadius: 50, height:25, width: 35 }, containerStyle: {marginRight: 5} }
          }
          chevron
          bottomDivider
          pad={5}
        />
        </TouchableOpacity>
      : null
    )
  }
}

const sectionWidth = Dimensions.get('window').width

// use redux to store all of the users
const mapDispatchToProps = (dispatch) => ({
  addToUsers: (user) => dispatch({type: 'ADD_TO_USERS',payload: user}),
  updateCount: (uid, num) => dispatch({type: 'UPDATE_COUNT',payload: uid,count: num}),
  addNewUser: (user) => dispatch({type: 'UPDATE_USERS',payload: user})
})

const mapStateToProps = (state) => {
  return {
      allAppUsers: state
  }
}
// this will navigate to a screen that will house gifted chat.
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(DidOrder))