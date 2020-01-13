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
import { Card, Avatar, ListItem, Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'


class Users extends React.Component {
    constructor(){
        super()
        this.state = {
            avatar: null,
            isLoading: true,
            users: [
              {
                name: 'Ron',
                address: 'Oak Line',
                phone: '2152152215',
                avatar: 'https://placeimg.com/140/140/any',
            },
            {
                name: 'Nes',
                address: 'West Philly',
                phone: '2152152225',
                avatar: 'https://placeimg.com/140/140/any',
            }
          ]
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
    var avatarRef = firebase.storage().ref(`${email}/images`)
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
        console.log('forEach', doc)
        this.props.addToUsers({
          name: doc._data.Name,
          address: doc._data.Address,
          phone: doc._data.Phone,
          avatar: doc
        })
      })
      console.log('allAppUsers ->', this.props.allAppUsers.renderUsers)
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
                    onPress={()=>
                    // this.props.navigation.navigate('ScreenGoesHere')
                    console.log(l.users)
                    }
                    key={i}
                    >
                    <ListItem
                      containerStyle={{width: sectionWidth / 1.1}}
                      key={i}
                      leftAvatar={{ source: { uri: l.avatar } }}
                      title={l.users.name}
                      subtitle={l.users.address}
                      rightSubtitle={l.users.phone}
                      chevron
                      bottomDivider
                      pad={5}
                    />
                    </TouchableOpacity>
                  ))
                }
              </View>
            </ScrollView>
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
      margin:10,
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