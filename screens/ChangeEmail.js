import React from 'react' 
import { 
    View, 
    StyleSheet, 
    SafeAreaView,
    Alert
} from 'react-native' 
import firebase from 'react-native-firebase' 
import { Button, Input } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import EditAvatar from '../Components/EditAvatar'

class ChangeEmail extends React.Component {
  static navigationOptions =  {
    title: 'Edit Email'
  }

  constructor(){
    super()
    this.state = {
      oldEmail: null,
      newEmail: null,
      password: null,
      confirmEmail: null,
      updated: false
    }
    const email = firebase.auth().currentUser.email  
    const userID = firebase.auth().currentUser.uid
    this.ref = firebase.firestore().collection('Users').doc(userID)
  }
  
  componentDidMount() {
    const email = firebase.auth().currentUser.email    
    // this.ref = firebase.firestore().collection('Users').doc(email)
    this.setState({ oldEmail: email })
    console.log(email)
  }

  logOut(){
    firebase.auth().signOut()
  }

  ProfilePage(){
    this.props.navigation.navigate('MyProfile')
  }

  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  changeEmail = (currentPassword, newEmail) => {
    var oldEmail = firebase.auth().currentUser.email
    const { confirmEmail } = this.state
    if(confirmEmail == oldEmail){
        this.reauthenticate(currentPassword).then(() => {
          var user = firebase.auth().currentUser
          user.updateEmail(newEmail).then(() => {
            console.log("Email updated!")

          }).catch((error) => { console.log(error) })
        }).catch((error) => { console.log(error) })
    this.props.navigation.navigate('MyProfile')
    }
    else Alert.alert('You must enter the correct current email or password')
  }

    render() {
      return (
        <SafeAreaView style={styles.container}>
          <EditAvatar />
            <Input
            autoCorrect = {false}
            autoCapitalize = 'none'
            placeholder='Current email'
            textContentType='emailAddress'
            containerStyle={{width:350, marginTop:50}}
            onChangeText={(text) => this.setState({confirmEmail: text})}
            />
            <Input
            autoCorrect = {false}
            placeholder='New email'
            autoCapitalize = 'none'
            containerStyle={{width:350}}
            textContentType='emailAddress'
            onChangeText={(text) => this.setState({newEmail: text})}
            />
            <Input
            autoCorrect = {false}
            autoCapitalize = 'none'
            placeholder='Password'
            containerStyle={{width:350}}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
            />

            <View style={styles.container2}>
          <Button 
            title='Submit'
            onPress={()=> this.changeEmail(this.state.password, this.state.newEmail)}

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

export default withNavigation(ChangeEmail)