import React from 'react'
import { 
    Text, 
    View, 
    SafeAreaView, 
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

class ShoppingCart extends React.Component {
    render(){
    return(
        <View style={styles.cart}>
            {/* Add onClick that takes us to the shopScreen */}
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Shop')}>
            <Icon
                name='shopping-bag'
                type='feather'
                color='#517fa4'
                reverse={true}
            />    
            </TouchableOpacity>          
        </View>
    )
    }
}

const styles = StyleSheet.create({
    cart: {
        position: 'absolute',
        top: 75,
        right: 15,
    },
})

export default withNavigation(ShoppingCart)
