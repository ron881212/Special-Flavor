import React from 'react'
import { 
    Image, 
    View, 
    SafeAreaView, 
    StyleSheet,
    TouchableOpacity
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
        const email = firebase.auth().currentUser.email   
        const userID = firebase.auth().currentUser.uid
        this.ref = firebase.firestore().collection('Users').doc(userID)
    }

    componentDidMount() {
        this.ref.onSnapshot(userInfo => {
          this.setState({
            avatar: userInfo._data.Avatar || 'https://placeimg.com/140/140/any',
          })
        })
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
        top: 75,
        left: 15,
    },
})

export default withNavigation(MyAvatar)