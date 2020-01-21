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
import { Card, Button, Avatar, ListItem, Input, Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

class Profile extends React.Component {
  constructor(){
    super()
    this.state = {
      name: null,
      email: null,
      password: null,
      phone: null,
      address: null,
      avatar: null
    }
    const userID = firebase.auth().currentUser.uid
    this.ref = firebase.firestore().collection('Users').doc(userID)
  }
static navigationOptions =  {
  title: 'Profile'
}
  // get email and password screen must have a way to change the password 
  // and a way to recover the password
  componentDidMount() {
    const email = firebase.auth().currentUser.email  
    userID = firebase.auth().currentUser.uid
    this.ref = firebase.firestore().collection('Users').doc(userID)
    this.ref.onSnapshot(userInfo => {
      this.setState({
        name: userInfo._data.Name,
        email: email,
        phone: userInfo._data.Phone,
        address: userInfo._data.Address,
      })
    })
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

  logOut(){
    firebase.auth().signOut()
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

              {/* NAME */}
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('EditName')}
              >
              <Card containerStyle={styles.cards}>
                <ListItem
                  chevron
                  containerStyle={{margin:0}}
                  title={'Name: ' + this.state.name}
                  badge={{ 
                    value: 'Edit', 
                    textStyle: { color: 'white', fontSize:15 },
                    badgeStyle: {backgroundColor:'#03A9F4', height:25, width:50 }
                  }}
                />
              </Card>
              </TouchableOpacity>

              {/* EMAIL */}
              <TouchableOpacity
              // Also check email == old email and reauthenicate( getProvider() ) 
              onPress={
                // ()=>console.log(firebase.auth().currentUser.updateEmail())
                ()=>this.props.navigation.navigate('ChangeEmail')
              }
              >
              <Card containerStyle={styles.cards}>
                <ListItem
                  chevron
                  containerStyle={{margin:0}}
                  title={'Change Email '}
                  badge={{ 
                    value: 'Edit', 
                    textStyle: { color: 'white', fontSize:15 },
                    badgeStyle: {backgroundColor:'#03A9F4', height:25, width:50 }
                  }}
                />
              </Card>
              </TouchableOpacity>

              {/* PASSWORD */}
              <TouchableOpacity
              // Also call reauthenicate( getProvider() ) 
              onPress={
                // ()=>console.log(firebase.auth().currentUser.updatePassword())
                ()=>this.props.navigation.navigate('ChangePassword')
              }
              >
              <Card containerStyle={styles.cards}>
                <ListItem
                  chevron
                  containerStyle={{margin:0}}
                  title={'Change Password'}
                  badge={{ 
                    value: 'Edit', 
                    textStyle: { color: 'white', fontSize:15 },
                    badgeStyle: {backgroundColor:'#03A9F4', height:25, width:50 }
                  }}
                />
              </Card>
              </TouchableOpacity>

              {/* PHONE */}
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('EditPhone')}
              >
              <Card containerStyle={styles.cards}>
                <ListItem
                  chevron
                  title={'Phone: ' + this.state.phone}
                  badge={{ 
                    value: 'Edit', 
                    textStyle: { color: 'white', fontSize:15 },
                    badgeStyle: {backgroundColor:'#03A9F4', height:25, width:50 }
                  }}
                />
              </Card>
              </TouchableOpacity>

              {/* ADDRESS */}
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('EditAddress')}
              >
              <Card containerStyle={styles.cards}>
                <ListItem
                  chevron
                  title={'Address: ' + this.state.address}
                  badge={{ 
                    value: 'Edit', 
                    textStyle: { color: 'white', fontSize:15 },
                    badgeStyle: {backgroundColor:'#03A9F4', height:25, width:50 }
                  }}
                />
              </Card>
              </TouchableOpacity>

              {/* LOG OUT */}
              <Button 
                title='Log Out'
                onPress={()=>this.logOut()}
                style={styles.buttons}
              />
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
    container2: {
      flexDirection: 'row'
    },
    avatar: {
      margin:20
    },
    buttons: {
      margin: 10,
      height: 50,
      width: sectionWidth / 1.1
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

export default withNavigation(Profile)