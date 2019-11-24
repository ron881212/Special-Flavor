import React from 'react' 
import { View, 
  Text, 
  StyleSheet, 
  TextInput, 
  SafeAreaView,
  Dimensions,
  TouchableOpacity
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
      address: null
    }
    const email = firebase.auth().currentUser.email    
    this.ref = firebase.firestore().collection('Users').doc(email)
  }
static navigationOptions =  {
  title: 'Profile',
  // headerLeft: null,
  // gesturesEnabled: false,
}
  // get email and password screen must have a way to change the password 
  // and a way to recover the password
  componentDidMount() {
    const email = firebase.auth().currentUser.email    
    this.ref.onSnapshot(userInfo => {
      this.setState({
        name: userInfo._data.Name,
        email: email,
        phone: userInfo._data.Phone,
        address: userInfo._data.Address,
      })
    })
  }

  logOut(){
    firebase.auth().signOut()
  }

    render() {   

      return (
        <SafeAreaView style={styles.container}>
            <Avatar
              rounded
              size='xlarge'
              source={require('../images/testImg.jpeg')}
            />
            {/* replace all items with list components that lands user to different edit pages */}
            <View>

              {/* NAME */}
              <TouchableOpacity
              onPress={()=>alert('Edit Name')}
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
              // Also call confirmEmail
              onPress={()=>console.log(firebase.auth().currentUser.updateEmail())}
              >
              <Card containerStyle={styles.cards}>
                <ListItem
                  chevron
                  containerStyle={{margin:0}}
                  title={'Email: ' + this.state.email}
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
              onPress={()=>console.log(firebase.auth().currentUser.updatePassword())}
              >
              <Card containerStyle={styles.cards}>
                <ListItem
                  chevron
                  containerStyle={{margin:0}}
                  title={'Change Password'}
                  badge={{ 
                    value: 'Send', 
                    textStyle: { color: 'white', fontSize:15 },
                    badgeStyle: {backgroundColor:'#03A9F4', height:25, width:50 }
                  }}
                />
              </Card>
              </TouchableOpacity>

              {/* PHONE */}
              <TouchableOpacity
              onPress={()=>alert('Edit Phone')}
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
              onPress={()=>alert('Edit Address')}
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
            </View>
            <View style={styles.container2}>
          {/* <Button 
            title='Edit'
            onPress={()=>this.props.navigation.navigate('Edit')}
            style={styles.buttons}
            /> */}
            </View>
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