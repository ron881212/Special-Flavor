import React from 'react'
import { 
    Text, 
    View, 
    SafeAreaView, 
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Icon, withBadge, Badge } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
class ShoppingCart extends React.Component {
    render(){

    // I would rather have no show of badge when cart is empty
    // const Shop = withBadge(this.props.cartItems.length || null)(Icon)

    return(
        <View style={styles.cart}>
            {/* Add onClick that takes us to the shopScreen */}
            <TouchableOpacity onPress={() => 
            this.props.navigation.navigate('Shop')
            // console.log(Object.keys(this.props.store.cartItems).length)
            }>
            <Icon
                name='shopping-cart'
                type='feather'
                color='#517fa4'
                reverse={true}
                containerStyle={{position: 'absolute', top: -7, right: -20}}
            />    
            {Object.keys(this.props.store.cartItems).length > 0 ? 

            <Badge 
                value={Object.keys(this.props.store.cartItems).length} 
                status="error"
                badgeStyle={{top:0,left:15}}
            /> : null }
            </TouchableOpacity>          
        </View>
    )
    }
}

const mapStoreToProps = (store) => {
    return {
        store: store
    }
}

const styles = StyleSheet.create({
    cart: {
        position: 'absolute',
        top: 75,
        right: 25,
    },
})

export default connect(mapStoreToProps)(withNavigation(ShoppingCart))
