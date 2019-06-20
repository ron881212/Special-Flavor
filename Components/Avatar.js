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


class MyAvatar extends React.Component {
    render(){
    return(
        <View style={styles.avatar}>
            {/* Add onClick that takes us to the profileScreen */}
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyProfile')}>
            <Avatar
            rounded
            size={60}
            source={
                require('../images/testImg.jpeg')
              }
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