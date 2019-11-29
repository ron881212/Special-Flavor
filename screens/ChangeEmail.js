import React from 'react' 
import { 
    View, 
    StyleSheet, 
    SafeAreaView, 
    TouchableOpacity
} from 'react-native' 
import firebase from 'react-native-firebase' 
import { Button, Input } from 'react-native-elements'
import { Avatar } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import ImagePicker from 'react-native-image-picker'

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
      avatarSource: null,
      updated: false
    }
    const email = firebase.auth().currentUser.email  
    this.ref = firebase.firestore().collection('Users').doc(email)
  }
  
  componentDidMount() {
    const email = firebase.auth().currentUser.email    
    // this.ref = firebase.firestore().collection('Users').doc(email)
    this.ref.onSnapshot(userInfo => {
      this.setState({
        avatarSource: userInfo._data.Avatar || 'https://placeimg.com/140/140/any',
      })
    })
    this.setState({ oldEmail: email })
    console.log(email)
  }

  logOut(){
    firebase.auth().signOut()
  }

  ProfilePage(){
    this.props.navigation.navigate('MyProfile')
  }

  selectImage = async () => {
  ImagePicker.showImagePicker({noData:true,mediaType:'photo'}, (response) => {
    console.log('Response = ', response)

    if (response.didCancel) {
      console.log('User cancelled image picker')
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error)
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton)
    } else {
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
  
      this.setState({
        avatarSource: response.uri,
      })
    }
  })
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
            const firestore = firebase.firestore()
            // get the data from 'oldEmail'
            firestore.collection("Users").doc(oldEmail).get().then(function (doc) {
                if (doc && doc.exists) {
                    var data = doc.data()
                    // saves the data to 'newEmail'
                    firestore.collection("Users").doc(newEmail).set(data)
                    .then(()=> {
                        firebase.firestore().collection("Users").doc(oldEmail).delete()
                        // .then()
                    })
                }
            })
          }).catch((error) => { console.log(error) })
        }).catch((error) => { console.log(error) })
    // this.props.navigation.navigate('MyProfile')
    }
    else alert('You must enter the correct current email or password')
  }

    render() {
      return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity>
            <Avatar
              rounded
              showEditButton
              size='xlarge'
              onPress={this.selectImage}
              containerStyle={{marginTop:100}}
              source={{uri: this.state.avatarSource}}
            />
            </TouchableOpacity>

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