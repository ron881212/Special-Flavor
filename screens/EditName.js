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

class EditName extends React.Component {
  static navigationOptions =  {
    title: 'Edit Name'
  }

  constructor(){
    super()
    this.state = {
      name: null,
      avatarSource: null
    }
    const email = firebase.auth().currentUser.email    
    this.ref = firebase.firestore().collection('Users').doc(email)
  }

  componentDidMount() {
    const email = firebase.auth().currentUser.email    
    this.ref = firebase.firestore().collection('Users').doc(email)
    this.ref.onSnapshot(userInfo => {
      this.setState({
        name: userInfo._data.Name,
        avatarSource: userInfo._data.Avatar,
      })
    })
  }

  logOut(){
    firebase.auth().signOut()
  }

  ProfilePage(){
    this.props.navigation.navigate('MyProfile')
  }

  data = () => {
    const { name, avatarSource } = this.state
    const email = firebase.auth().currentUser.email
    // // this is an successful atempt to use user email as a doc in firestore
    this.userInfo = firebase.firestore().collection('Users').doc(email)
    firebase.firestore().runTransaction(async transaction => {
        const doc = await transaction.get(this.userInfo)
        // if it does not exist set the population to one
        if (doc.exists) {
          transaction.update(this.userInfo, 
              { Name: name, Avatar: avatarSource }
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
              onPress={this.selectImage}
              source={{uri: this.state.avatarSource}}
            />
            </TouchableOpacity>
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