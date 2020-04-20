import React, {useEffect} from 'react' 
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

class Users extends React.Component {
  constructor(){
    super()
    this.state = {
        avatar: null,
        isLoading: true,
        users: [],
        updates: 0
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
    b()
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

  // Callback method for snapshop on count and users
  b = async () => {
  // Expected to loop thru all user counts
  const getUsers = await firebase.firestore().collection('Users').get()
  !this.state.isLoading ?
    getUsers.docs.forEach( doc => {
      let getCount = firebase.firestore().collection('Users').doc(doc._ref._documentPath._parts[1])
      getCount.onSnapshot(current => {
      if(__DEV__) {
        console.tron.log('We need this to be the current affected user', current)
        console.tron.log('Loaded current users', this.props.allAppUsers.renderUsers)
        console.tron.log('UID of the effected user -> ',current._ref._documentPath._parts[1])
        this.props.updateCount(current._ref._documentPath._parts[1], current._data.Count)
      }
        // right here take in the uid and add the uid fields to the user 
        // this.props.addNewUser()
      })
    })
  :
  null
}

  render() {
    return (
      <SafeAreaView style={styles.container}>
      {/* Use own profilePic in database */}
          <Avatar
            rounded
            size='xlarge'
            source={{uri: this.state.avatar}}
            containerStyle={styles.avatar}
          />
          <ScrollView>
          <FlatList
            data={this.props.allAppUsers.renderUsers}
            extraData={this.props}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => 
              <Orders
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
          </ScrollView>
          <NoOrder />
      </SafeAreaView>
    )
  }
}

const Orders = props => {

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
  addNewUser: (user) => dispatch({type: 'UPDATE_USERS',payload: user})
})

const mapStateToProps = (state) => {
  return {
      allAppUsers: state
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Users))