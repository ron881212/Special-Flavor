import React from 'react' 
import { 
    View, 
    StyleSheet, 
    SafeAreaView, 
} from 'react-native' 
import firebase from 'react-native-firebase' 
import { Button, Input } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import EditAvatar from '../Components/EditAvatar'

class EditName extends React.Component {
  static navigationOptions =  {
    title: 'Edit Name'
  }

  constructor(){
    super()
    this.state = {
      name: null
    }
    const email = firebase.auth().currentUser.email  
    userID = firebase.auth().currentUser.uid 
    this.ref = firebase.firestore().collection('Users').doc(userID)
  }

  componentDidMount() {
    this.mounted = false
    const email = firebase.auth().currentUser.email  
    this.ref = firebase.firestore().collection('Users').doc(userID)
    userID = firebase.auth().currentUser.uid 
    this.ref.onSnapshot(userInfo => {
      if(!this.mounted){
        this.setState({
        name: userInfo._data.Name
      })
      }
    })
  }

  componentWillUnmount(){
    this.mounted = true
  }

  logOut(){
    firebase.auth().signOut()
  }

  ProfilePage(){
    this.props.navigation.navigate('MyProfile')
  }

  data = () => {
    const { name } = this.state
    const email = firebase.auth().currentUser.email
    userID = firebase.auth().currentUser.uid 
    // // this is an successful atempt to use user email as a doc in firestore
    this.userInfo = firebase.firestore().collection('Users').doc(userID)
    firebase.firestore().runTransaction(async transaction => {
        const doc = await transaction.get(this.userInfo)
        // if it does not exist set the population to one
        if (doc.exists) {
          transaction.update(this.userInfo, 
              { Name: name }
          )
        }
    })
    this.ProfilePage()
  }

    render() {
      return (
        <SafeAreaView style={styles.container}>
          <EditAvatar />
            <Input
            placeholder={this.state.name}
            onChangeText={(nameText) => this.setState({name: nameText})}
            />
            <View style={styles.container2}>
          <Button 
            title='Submit'
            onPress={()=>this.data()}
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

export default withNavigation(EditName)