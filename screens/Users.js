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
    // get email and password screen must have a way to change the password 
    // and a way to recover the password
    componentDidMount() {
    //grab all user names pics and set it to a state array to map over
      this.getUsers()
      // this.setState({users:this.allUsers})
      // console.log(this.state.users)
      this.setState({isLoading: false})
    //grabs the admin picture
    const email = firebase.auth().currentUser.email  
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

    getUsers = async () => {
      const getUsers = await firebase.firestore().collection('Users').get()
      getUsers.docs.forEach( doc => {
        // found clever way to add avatar here and work on screen.
        // console.log(doc._ref._documentPath._parts[1])
        var avatarRef = firebase.storage().ref(`${doc._ref._documentPath._parts[1]}/images`)
        // console.log(doc._ref._documentPath._parts[1])
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
      // console.log('allAppUsers ->', this.props.allAppUsers.renderUsers)
    }
   
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
        <SafeAreaView style={styles.container}>
        {/* Use own profilePic in database */}
            <Avatar
              rounded
              size='xlarge'
              source={{uri: this.state.avatar}}
              containerStyle={styles.avatar}
            />
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

                  { l.users.count > 1 ? 

                    <ListItem
                      containerStyle={{width: sectionWidth / 1.1}}
                      key={i}
                      leftAvatar={{ source: { uri: l.users.avatar} }}
                      title={l.users.name}
                      subtitle={l.users.address}
                      // rightSubtitle={l.users.phone}
                      badge={
                        // l.users.count > 1 ?
                        { value: l.users.count, textStyle: { color: 'white', fontSize: 20 },status:"primary", badgeStyle: {borderRadius: 50, height:25, width: 35 }, containerStyle: {marginRight: 5} }
                        // : null
                      }
                      chevron
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
      // margin:10,
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
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Users))