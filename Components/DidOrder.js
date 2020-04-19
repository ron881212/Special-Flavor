import React from 'react' 
import { View, 
  Text, 
  StyleSheet, 
  TextInput, 
  SafeAreaView,
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

    handleChat = (userUID, cb) => {
      // this function will take in the user uid and navitgate to the
      Fire.customUid = null;
      Fire.customUid = userUID;
      // console.log(Fire.customUid)
      cb()
    }

    render() {
        return (
            props.count > 0 ?
              <TouchableOpacity
              // Navigates to the same screen but the chat changes to the user
              onPress={()=> {
              props.handleChat(props.userUID, props.nav);
              }}
              >
              <ListItem
                containerStyle={{width: sectionWidth / 1.1}}
                leftAvatar={{ source: { uri: props.userAvatar} }}
                title={props.name}
                subtitle={props.address}
                // rightSubtitle={l.users.phone}
                badge={
                  { value: props.count, textStyle: { color: 'white', fontSize: 20 },status:"primary", badgeStyle: {borderRadius: 50, height:25, width: 35 }, containerStyle: {marginRight: 5} }
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

// const sectionWidth = Dimensions.get('window').width
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'space-around',
//       backgroundColor: '#e8e8e8',
//     },
//     avatar: {
//       margin:20
//     },
//     cards: {
//       display: 'flex',
//       flexDirection: 'column',
//       height: 80,
//       borderRadius: 5,
//       borderColor: 'white',
//       width: sectionWidth / 1.1,
//       shadowColor: 'rgba(0,0,0, .2)',
//       shadowOffset: { height: 0, width: 0 },
//       shadowOpacity: 0,
//       shadowRadius: 0
//     },
// })

// use redux to store all of the users
const mapDispatchToProps = (dispatch) => ({
  addToUsers: (user) => dispatch({type: 'ADD_TO_USERS',payload: user}),
})

const mapStateToProps = (state) => {
  return {
      allAppUsers: state
  }
}
// this will navigate to a screen that will house gifted chat.
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(DidOrder))