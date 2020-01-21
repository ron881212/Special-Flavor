import React from 'react' 
import { TouchableOpacity } from 'react-native' 
import firebase from 'react-native-firebase' 
import { Avatar } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker'

class EditAvatar extends React.Component {

  constructor(){
    super()
    this.state = {
      avatarSource: null
    }
    userID = firebase.auth().currentUser.uid 
    this.ref = firebase.firestore().collection('Users').doc(userID)
  }

  componentDidMount() {
    const email = firebase.auth().currentUser.email  
    this.ref = firebase.firestore().collection('Users').doc(userID)
    userID = firebase.auth().currentUser.uid 
      var avatarRef = firebase.storage().ref(`${userID}/images`)
      console.log('avatarRef =', avatarRef)
      avatarRef.getDownloadURL().then( url => {
        this.setState({
          avatarSource: url
        })
        console.log(url)
      }).catch( () => {
        this.setState({
            avatarSource: 'https://placeimg.com/140/140/any'
          })
      })
  }

  selectImage = async () => {
  ImagePicker.showImagePicker({noData:true,mediaType:'photo'}, (response) => {
    console.log('Response = ', response)
    const email = firebase.auth().currentUser.email
    if (response.didCancel) {
      console.log('User cancelled image picker')
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error)
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton)
    } else {
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      // store this url in 'avatar' under the user
      // firebase.firestore().runTransaction(async transaction => {
      //   const doc = await transaction.get(this.ref)
      //   if (doc.exists) {
      //     transaction.update(this.ref, 
      //       { Avatar: response.uri }
      //     )
      //   } 
      //   else if (!doc.exists) {
      //     transaction.set(this.ref, 
      //         { Avatar: response.uri }
      //     )
      //   }
      // })
      var ref = firebase.storage().ref().child(`${userID}/images`)

        this.setState({
          avatarSource: response.uri,
        })
      return ref.putFile(response.uri)
    }
  })
  }

    render() {
      return (
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
      )
    }
}

export default EditAvatar