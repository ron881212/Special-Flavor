import React  from 'react' 
import { View, 
  Text, 
  StyleSheet, 
  TextInput, 
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native' 
import firebase from 'react-native-firebase' 
import Fire from '../Components/Fire'
import NoOrder from '../Components/NoOrder'
import { Card, Avatar, ListItem, Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import DidOrder from '../Components/DidOrder'
import LargeAvatar from '../Components/LargeAvatar'

class Users extends React.Component {
  constructor(){
    super()
    this.state = {
        isLoading: true,
    }
    const userID = firebase.auth().currentUser.uid
    this.ref = firebase.firestore().collection('Users').doc(userID)
    this.allUsers = []
  }
  static navigationOptions =  {
    title: 'Users'
  }
  componentDidMount() {
    //grab all user names pics and set it to a state array to map over
    this.getUsers(this.a, this.b)
    this.setState({isLoading: false})
    //grabs the admin picture
    var avatarRef = firebase.storage().ref(`${userID}/images`)
    avatarRef.getDownloadURL().then( url => {
    this.setState({
      avatar: url
    })
    }).catch( () => {
      this.setState({
        avatar: 'https://placeimg.com/140/140/any'
      })
    })
  }

  getUsers = async (a, b) => {
    const getUsers = await firebase.firestore().collection('Users').get()
    // Set the fields for all users
    getUsers.docs.forEach( doc => {
      var avatarRef = firebase.storage().ref(`${doc._ref._documentPath._parts[1]}/images`)
      avatarRef.getDownloadURL().then( url => {
        this.props.addToUsers({
          count: doc._data.Count,
          name: doc._data.Name,
          phone: doc._data.Phone,
          address: doc._data.Address,
          uid: doc._ref._documentPath._parts[1],
          avatar: url || 'https://placeimg.com/140/140/any'
        })
      }).catch(
        (err) => console.log(err)
      )
    })
    // Callbacks for setting isLoading and count snapshots
    a()
  }

  // This function takes in the user uid and navitgate to the chat
  handleChat = (userUID, cb) => {
    Fire.customUid = null;
    Fire.customUid = userUID;
    cb()
  }
  // Callback to navigate to chat
  cb = () => {
    // Clear badge count here
    this.props.navigation.navigate('Customer')
  }
  a = () => {
    this.setState({isLoading: false})
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      {/* Use own profilePic in database */}
          <LargeAvatar />
          <ScrollView>
          {!this.state.isLoading ?
          <FlatList
            data={this.props.allAppUsers.renderUsers}
            extraData={this.props}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => 
              <DidOrder
                handleChat={this.handleChat}
                userUID={item.users.uid}
                nav={this.cb}
                userAvatar={item.users.avatar}
                name={item.users.name}
                address={item.users.address}
                count={item.users.count}
              />
            }
          />
          :
          null
          }
          </ScrollView>
          <NoOrder />
      </SafeAreaView>
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
    borderRadius: 5,
    borderColor: 'white',
    width: sectionWidth / 1.1,
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0, //default is 1
    shadowRadius: 0
  },
})

// Stored users in redux
const mapDispatchToProps = (dispatch) => ({
  addToUsers: (user) => dispatch({type: 'ADD_TO_USERS',payload: user}),
  updateCount: (uid, num) => dispatch({type: 'UPDATE_COUNT',payload: uid,count: num}),
})

const mapStateToProps = (state) => {
  return {
      allAppUsers: state
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Users))