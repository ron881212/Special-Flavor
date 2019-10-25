import React from 'react' 
import { View, 
  Text, 
  StyleSheet, 
  TextInput, 
  SafeAreaView
} from 'react-native' 
import firebase from 'react-native-firebase' 
import { Button, Input } from 'react-native-elements'
import { Avatar } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

class Profile extends React.Component {
  constructor(){
    super()
    this.state = {
      name: null,
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

  componentDidMount() {
    this.ref.onSnapshot(userInfo => {
      this.setState({
        name: userInfo._data.Name,
        phone: userInfo._data.Phone,
        address: userInfo._data.Address
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
              <Text>
              Name: {this.state.name}
              </Text>
              <Text>
              Phone: {this.state.phone}
              </Text>
              <Text>
              Address: {this.state.address}
              </Text>
            <View style={styles.container2}>
          <Button 
            title='Edit'
            onPress={()=>this.props.navigation.navigate('Edit')}
            style={styles.buttons}
            />
          <Button 
            title='Log Out'
            onPress={()=>this.logOut()}
            style={styles.buttons}
            />
            </View>
        </SafeAreaView>
      )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'whitesmoke'
    },
    container2: {
      flexDirection: 'row'
    },
    buttons: {
      margin: 10,
      height: 50,
      width: 155
    },
})

export default withNavigation(Profile)