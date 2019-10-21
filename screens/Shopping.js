import React from 'react'
import { Text, View, SafeAreaView, StyleSheet, Button } from 'react-native'
import { withNavigation } from 'react-navigation'
import RegFlavors from '../WaterIce/RegFlavors'
import { connect } from 'react-redux'

class ShopScreen extends React.Component {
static navigationOptions =  {
    title: 'Shopping Cart',
    headerLeft: null,
    gesturesEnabled: false,
  }

render(){
  return (
    <View style={styles.container}>
      {this.props.cartItems.length > 0 ? 
      // here is where I put my custom component that renders shopping cart items with info like price/size, picture, name etc.
      //might have to use a flatlist or map over all items in cart
      <Button 
        onPress={this.props.removeItem}
        title = "here"
        //{this.props.cartItems}
      />
      
      // what the shopping cart show when empty
      :<Text>Welcome to the shopping cart</Text>
      }
    </View>
  )
  }
}

const mapStateToProps = (state) => {
  return {
      cartItems: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      removeItem: (product) => dispatch({type: 'REMOVE_FROM_CART', payload: product})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ShopScreen)) 