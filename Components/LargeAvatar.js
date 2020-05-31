import React from 'react'
import { 
    View, 
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import { Avatar } from 'react-native-elements'
import firebase from 'react-native-firebase' 

class LargeAvatar extends React.Component {

    constructor(){
        super()
        this.state = {
          avatar: null
        }
        userID = firebase.auth().currentUser.uid
        this.ref = firebase.firestore().collection('Users').doc(userID)
    }

    componentDidMount() {
        this.ref = firebase.firestore().collection('Users').doc(userID)
        userID = firebase.auth().currentUser.uid 
        var avatarRef = firebase.storage().ref(`${userID}/images`)
        avatarRef.getDownloadURL().then( url => {
        this.setState({
            avatar: url
        })
        }).catch( () => {
        this.setState({
            avatar: 'https://placeimg.com/140/140/any'
          })
        })
    }
    
    render(){
    return(
        <View style={styles.avatar}>
            <Avatar
            rounded
            size='xlarge'
            source={{uri: this.state.avatar}}
            containerStyle={styles.avatar}
            renderPlaceholderContent={<ActivityIndicator />}
            />
        </View>
    )
    }
}

const styles = StyleSheet.create({
    avatar: {
        // position: 'absolute',
        // top: '10%',
        // left: '7%',
        margin: 20
    },
})

export default LargeAvatar