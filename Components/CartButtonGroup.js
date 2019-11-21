import React from 'react'
import { Text, View } from 'react-native'
import { ButtonGroup, Slider, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import TotalButton from './TotalButton'

// var array = require('lodash/array')
// var object = require('lodash/fp/object')
class CartButtonGroup extends React.Component {
constructor () {
    super()
    this.state = {
      selectedIndex: 0,
      price: 5,
      value: 1,
      total: 5
    }
    this.updateIndex = this.updateIndex.bind(this)
    this.updateTotal = this.updateTotal.bind(this)
    this.updateGrandTotal = this.updateGrandTotal.bind(this)
  }

  componentDidMount() {
    this.updateGrandTotal()
  }
  
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    if(selectedIndex == 0) {
      this.setState({price: 5})
      this.setState({total: (5 * this.state.value)})
      for(let i = 0; i < this.props.store.cartItems.length; i++){
        if(this.props.store.cartItems[i].item.id == this.props.itemID){
          return this.props.store.cartItems[i].item.price = (5 * this.state.value)
        }
      }
    }
    if(selectedIndex == 1) {
      this.setState({price: 30})
      this.setState({total: (30 * this.state.value)})
      for(let i = 0; i < this.props.store.cartItems.length; i++){
        if(this.props.store.cartItems[i].item.id == this.props.itemID){
          return this.props.store.cartItems[i].item.price = (30 * this.state.value)
        }
      }
    } 
  }
  updateTotal() {
    this.setState({total: (this.state.price * this.state.value)})
    console.log(this.props.store.cartTotal.total)
    for(let i = 0; i < this.props.store.cartItems.length; i++){
      if(this.props.store.cartItems[i].item.id == this.props.itemID){
        this.props.store.cartItems[i].item.price = (this.state.price * this.state.value)
        this.updateGrandTotal()
        return this.props.store.cartItems[i].item.price
      }
    }

  }
  
  updateGrandTotal(){
    nowTotal = 0
    for(let i = 0; i < this.props.store.cartItems.length; i++){
      nowTotal += this.props.store.cartItems[i].item.price
    }
    console.log(nowTotal)
    console.log('ADD_TO_TOTAL ' + this.props.addToTotal)
    this.props.addToTotal(nowTotal)
    // this.setState({total:nowTotal})
  }
  
  render () {
    const buttons = ['Pint', 'Gallon']
    const { selectedIndex } = this.state
  
    return (
    <>
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        selectedButtonStyle={{backgroundColor:'#03A9F4'}}
        containerStyle={{height: 25, width: 200}}
      />
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
  addToTotalCart: (product, id) => dispatch({type: 'ADD_TOTAL_TO_CART', payload: product, id: id})
})

export default connect(mapStoreToProps, mapDispatchToProps)(CartButtonGroup)

