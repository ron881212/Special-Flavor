import React from 'react'
import { Text, View } from 'react-native'
import { ButtonGroup, Slider, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase' 

class SnackButtonGroup extends React.Component {
constructor () {
    super()
    this.state = {
      selectedIndex: 0,
      price: null,
      gallon: null,
      value: null,
      total: null,
      normal: null,
      large: null,
    }
    this.updateTotal = this.updateTotal.bind(this)
    this.updateGrandTotal = this.updateGrandTotal.bind(this)
}

  componentDidMount() {
    this.updateGrandTotal()
    this.setState({price: this.props.pintPrice})
    this.setState({total: this.props.pintPrice})
    this.setState({normal: this.props.pintPrice})
    this.setState({large: this.props.gallonPrice})
    this.setState({value: this.props.value})
  }

  updateTotal() {
    this.setState({total: (this.state.price * this.state.value)})
    this.props.updateQuantity(this.props.itemID, this.state.value)
    this.props.productTotal(this.props.itemID, this.state.total)
    for(let i = 0; i < this.props.store.cartItems.length; i++){
      if(this.props.store.cartItems[i].item.id == this.props.itemID){
        this.props.store.cartItems[i].item.pintPrice = (this.state.price * this.state.value)
        this.updateGrandTotal()
        return this.props.store.cartItems[i].item.pintPrice
      }
    }

  }
  
  updateGrandTotal(){
    let nowTotal = 0
    for(let i = 0; i < this.props.store.cartItems.length; i++){
      nowTotal += this.props.store.cartItems[i].item.pintPrice
    }
    this.props.addToTotal(nowTotal)
  }
  
  render () {
  
    return (
    <>
      <Text>price: {'$' + this.state.price + '.00'}      total: {'$' + this.state.total + '.00'}</Text>
      <View style={{flex: 1, alignItems: 'stretch',justifyContent: 'center',marginTop: 35}}>
        <Slider
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
          minimumValue={0}
          maximumValue={10}
          thumbTintColor='#03A9F4'
          minimumTrackTintColor='#03A9F4'
          step={1}
          onSlidingComplete={this.updateTotal}
        />
        <Text style={{height:20}}>Quantity: {this.state.value}</Text>
      </View>
    </>
    )
  }
}

// try to name state something else
const mapStoreToProps = (store) => {
    return {
      store: store
    }
}

const mapDispatchToProps = (dispatch) => ({
  removeItem: (product) => dispatch({type: 'REMOVE_FROM_CART', payload: product}),
  addToTotal: (product) => dispatch({type: 'ADD_TO_TOTAL', payload: product}),
  addToTotalCart: (product, id) => dispatch({type: 'ADD_TOTAL_TO_CART', payload: product, id: id}),
  updateQuantity: (id, num) => dispatch({type: 'UPDATE_QUANTITY', payload: id, count: num}),
  productTotal: (id, num) => dispatch({type: 'PRODUCT_TOTAL', payload: id, total: num})
})

export default connect(mapStoreToProps, mapDispatchToProps)(SnackButtonGroup)

