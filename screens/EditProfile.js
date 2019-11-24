import React from 'react' 
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    SafeAreaView, 
    TouchableOpacity
} from 'react-native' 
import firebase from 'react-native-firebase' 
import { Button, Input } from 'react-native-elements'
import { Avatar } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import ImagePicker from 'react-native-image-picker'

class EditProfile extends React.Component {
  constructor(){
    super()
    this.state = {
      user: null,  
      name: null,
      phone: null,
      address: null,
      avatarSource: null
    }
  }
static navigationOptions =  {
  title: 'Edit Profile',
  // headerLeft: null,
  // gesturesEnabled: false,
}

  logOut(){
    firebase.auth().signOut()
  }

  ProfilePage(){
    this.props.navigation.navigate('MyProfile')
  }

  data = () => {
    const { name, phone, address, user } = this.state
    const email = firebase.auth().currentUser.email
    // // this is an successful atempt to use user email as a doc in firestore
    this.userInfo = firebase.firestore().collection('Users').doc(email)
    firebase.firestore().runTransaction(async transaction => {
        const doc = await transaction.get(this.userInfo)
        // if it does not exist set the population to one
        if (doc.exists) {
          transaction.update(this.userInfo, 
              { Name: name, Phone: phone, Address: address }
          )
        }
      })
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
            {/* This.selectImage here */}
            <Avatar
              rounded
              showEditButton
              size='xlarge'
              source={require('../images/testImg.jpeg')}
            />
            </TouchableOpacity>
            <Input
            placeholder='Name'
            onChangeText={(nameText) => this.setState({name: nameText})}
            />
            <Input
            placeholder='Phone'
            onChangeText={(phoneText) => this.setState({phone: phoneText})}
            />
            <Input
            placeholder='Address'
            onChangeText={(addressText) => this.setState({address: addressText})}
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

export default withNavigation(EditProfile)