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

class NoOrder extends React.Component {

    handleChat = (userUID, cb) => {
      // this function will take in the user uid and navitgate to the
      Fire.customUid = null;
      Fire.customUid = userUID;
      // console.log(Fire.customUid)
      cb()
    }

    cb = () => {
      this.props.navigation.navigate('Customer')
    }

    render() {

      return (
 
            <ScrollView>
              <View containerStyle={styles.cards}>
              {/* ALL USERS WILL BE MAPPED HERE */}
                { 
                  this.props.allAppUsers.renderUsers.map((l, i, a) => (
                    <TouchableOpacity
                    // this will navigate to the same screen but the chat will change to 
                    // whoever we clicked on.
                    onPress={()=> {
                    this.handleChat(l.users.uid, this.cb);
                    // console.log(l) 
                    }
                    }
                    key={i}
                    >

                  { l.users.count < 1 ? 

                    <ListItem
                      containerStyle={{width: sectionWidth / 1.1}}
                      key={i}
                      leftAvatar={{ source: { uri: l.users.avatar} }}
                      title={l.users.name}
                      subtitle={l.users.address}
                      rightSubtitle={l.users.phone}
                      // chevron
                      bottomDivider
                      pad={5}
                    />
                    :
                    null
                  }
                    </TouchableOpacity>
                  ))
                }
              </View>
            </ScrollView>
      )
    }
}

const sectionWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#e8e8e8',
    },
    avatar: {
      margin:20
    },
    cards: {
      display: 'flex',
      flexDirection: 'column',
      height: 80,
    //   margin:10,
      borderRadius: 5,
      borderColor: 'white',
      width: sectionWidth / 1.1,
      shadowColor: 'rgba(0,0,0, .2)',
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0, //default is 1
      shadowRadius: 0
    },
})

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
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(NoOrder))