import React from 'react'
import { 
    Text, 
    View, 
    SafeAreaView, 
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Icon, withBadge } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

class ShoppingCart extends React.Component {
    render(){

    const Shop = withBadge(this.props.cartItems.length)(Icon)

    return(
        <View style={styles.cart}>
            {/* Add onClick that takes us to the shopScreen */}
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Shop')
            }>
            <Shop
                name='shopping-cart'
                type='feather'
                color='#517fa4'
                reverse={true}
                containerStyle={{position: 'absolute', top: -7, right: -20}}
            />    
            </TouchableOpacity>          
        </View>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

const styles = StyleSheet.create({
    cart: {
        position: 'absolute',
        top: 75,
        right: 25,
    },
})

export default connect(mapStateToProps)(withNavigation(ShoppingCart))
