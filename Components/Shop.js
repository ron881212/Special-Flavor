import React from 'react'
import { 
    Text, 
    View, 
    SafeAreaView, 
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native'
import { Icon, withBadge, Badge } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
class ShoppingCart extends React.Component {
    render(){

    return(
        <View style={styles.cart}>
            {/* Add onClick that takes us to the shopScreen */}
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Shop')}>
            <Icon
                name='shopping-cart'
                type='feather'
                color='#517fa4'
                reverse={true}
                size={28}
            />    
            </TouchableOpacity> 
            {Object.keys(this.props.store.cartItems).length > 0 ? 

            <Badge 
                value={Object.keys(this.props.store.cartItems).length} 
                status="error"
                containerStyle={{ position: 'absolute', top: 5, right: 5}}
            /> : null }
                     
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
        top: Platform.OS === 'ios' ? 75 : 30,
        right: Platform.OS === 'ios' ? 25 : 10,
    },
})

export default connect(mapStoreToProps)(withNavigation(ShoppingCart))
