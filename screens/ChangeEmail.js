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
    title: 'Edit Address'
  }

  constructor(){
    super()
    this.state = {
      oldEmail: null,
      newEmail: null,
      confirmEmail: null,
      password: null,
      avatarSource: null
    }
    const email = firebase.auth().currentUser.email  
    // this.currentUser = firebase.auth().currentUser   
    this.ref = firebase.firestore().collection('Users').doc(email)
  }
  
  componentDidMount() {
    const email = firebase.auth().currentUser.email    
    this.ref = firebase.firestore().collection('Users').doc(email)
    this.ref.onSnapshot(userInfo => {
      this.setState({
        avatarSource: userInfo._data.Avatar,
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

  data = () => {
    // const reauthenticate = firebase.auth().currentUser.reauthenticateWithCredential
    const email = firebase.auth().currentUser.email 
    // var { oldEmail, newEmail, confirmEmail } = this.state
    const user = firebase.auth().currentUser
    // console.log(newEmail)
    if(this.state.newEmail === this.state.confirmEmail && this.state.oldEmail == email){
        user.updateEmail(this.state.newEmail)
        .then(alert('email changed'))
        .catch(err =>
            console.log(err),
            alert('You been logged in too long. Log out and log back in.')
            // alert('all matches')
        )
    }
    else alert('Your email must match')
    this.ProfilePage()
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
            // textContentType='emailAddress'
            containerStyle={{width:350, marginTop:50}}
            onChangeText={(text) => this.setState({oldEmail: text})}
            />
            <Input
            autoCorrect = {false}
            placeholder='New email'
            autoCapitalize = 'none'
            containerStyle={{width:350}}
            // textContentType='emailAddress'
            onChangeText={(text) => this.setState({newEmail: text})}
            />
            <Input
            autoCorrect = {false}
            autoCapitalize = 'none'
            placeholder='Confirm email'
            containerStyle={{width:350}}
            // textContentType='emailAddress'
            onChangeText={(text) => this.setState({confirmEmail: text})}
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