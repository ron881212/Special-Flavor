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
      address: null,
      order: null
    }
  }
static navigationOptions =  {
  title: 'Profile',
  // headerLeft: null,
  // gesturesEnabled: false,
}

  logOut(){
    firebase.auth().signOut()
  }

  data = () => {
    const { address, order } = this.state
    // use context to maintain doc name to keep user info seperate
    this.userInfo = firebase.firestore().collection('userInfo').doc('My Unique Name')
      firebase.firestore().runTransaction(async transaction => {
          const doc = await transaction.get(this.userInfo);
          // if it does not exist set the population to one
          if (doc.exists) {
            transaction.update(this.userInfo, { adresses: address, orders: order })
          }
      })
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
            Name: Ronald Glover
            </Text>
            <Text>
            Phone: 215-555-1017
            </Text>
            <Text>
            Address: 6935 N 15 Street
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