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
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
    }
    const userID = firebase.auth().currentUser.uid
    this.ref = firebase.firestore().collection('Users').doc(userID)
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
        user.email, currentPassword)
    return user.reauthenticateWithCredential(cred)
  }

  changePassword = (currentPassword, newPassword) => {
    var { confirmPassword} = this.state
    if(confirmPassword == newPassword){
      this.reauthenticate(currentPassword).then(() => {
        var user = firebase.auth().currentUser
        var { newPassword } = this.state
        console.log('This is the password ' + newPassword)
        user.updatePassword(newPassword).then(() => {
          console.log("Password updated!")

        }).catch((error) => { console.log(error) })
      }).catch((error) => { console.log(error) })
      this.props.navigation.navigate('MyProfile')
    }
    else Alert.alert('Your passwords must match')
  }

    render() {
      return (
        <SafeAreaView style={styles.container}>
          <EditAvatar />
            <Input
            autoCorrect = {false}
            autoCapitalize = 'none'
            placeholder='Current password'
            containerStyle={{width:350, marginTop:50}}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({currentPassword: text})}
            />
            <Input
            autoCorrect = {false}
            autoCapitalize = 'none'
            placeholder='New Password'
            containerStyle={{width:350}}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({newPassword: text})}
            />
            <Input
            autoCorrect = {false}
            autoCapitalize = 'none'
            placeholder='Confirm Password'
            containerStyle={{width:350}}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({confirmPassword: text})}
            />

            <View style={styles.container2}>
          <Button 
            title='Submit'
            onPress={()=> this.changePassword(this.state.currentPassword, this.state.newPassword)}
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