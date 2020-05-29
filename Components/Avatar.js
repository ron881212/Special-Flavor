import React from 'react'
import { 
    View, 
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { Avatar } from 'react-native-elements'
import firebase from 'react-native-firebase' 

class MyAvatar extends React.Component {

    constructor(){
        super()
        this.state = {
          avatar: null
        }
    }
    
    componentDidMount() {
        // const email = firebase.auth().currentUser.email  
        // this.ref = firebase.firestore().collection('Users').doc(userID)
        this.img = false
        const getImg = async () => {
          const userID = firebase.auth().currentUser.uid
          var avatarRef = firebase.storage().ref(`${userID}/images`)
            await avatarRef.getDownloadURL().then( url => {
            if(!this.img){
              this.setState({
                  avatar: url
              })
            }
            }).catch( () => {
              this.setState({
                  avatar: 'https://placeimg.com/140/140/any'
                })
            })
        }
        getImg()
    }

    componentWillUnmount(){
        this.img = true
    }
    
    render(){
    return(
        <View style={styles.avatar}>
            {/* Add onClick that takes us to the profileScreen */}
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyProfile')}>
            <Avatar
            rounded
            size={60}
            source={{uri: this.state.avatar}}
            />
            </TouchableOpacity>
        </View>
    )
    }
}

const styles = StyleSheet.create({
    avatar: {
        position: 'absolute',
        top: '10%',
        left: '7%'
    },
})

export default withNavigation(MyAvatar)