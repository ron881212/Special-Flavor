import React from 'react'
import { Text, View } from 'react-native'
import { ButtonGroup, Slider, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase' 

class CartButtonGroup extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedIndex: null,
      price: null,
      gallon: null,
      value: null,
      total: null,
      normal: null,
      large: null,
    } 
    this.updateIndex = this.updateIndex.bind(this)
    this.updateTotal = this.updateTotal.bind(this)
    this.updateGrandTotal = this.updateGrandTotal.bind(this)
  }

  componentDidMount() {
    this.updateGrandTotal()
    this.setPrice() 
    this.setState({normal: 5})
    this.setState({large: 30})
    this.setState({gallon: 30})
    this.setState({value: this.props.value})
    this.setState({total: this.props.pintPrice})
    this.setState({selectedIndex: this.props.sizeIndex})
    console.tron.log('this.props.sizeIndex',this.props.sizeIndex)
  }

  setPrice(){
    if(this.props.sizeIndex == 0) this.setState({price: 5})
    if(this.props.sizeIndex == 1) this.setState({price: 30})
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    this.props.updateSelectedIndex(this.props.itemID, selectedIndex)
    if(selectedIndex == 0) {
      this.setState({price: this.state.normal})
      this.setState({total: (this.state.normal * this.state.value)})
      for(let i = 0; i < this.props.store.cartItems.length; i++){
        if(this.props.store.cartItems[i].item.id == this.props.itemID){
          this.props.store.cartItems[i].item.pintPrice = (this.state.normal * this.state.value)
          this.updateGrandTotal()
          return this.props.store.cartItems[i].item.pintPrice
        }
      }
    }

    if(selectedIndex == 1) {
      console.log(this.props.store.cartItems)
      this.setState({price: this.state.large})
      this.setState({total: (this.state.gallon * this.state.value)})
      for(let i = 0; i < this.props.store.cartItems.length; i++){
        if(this.props.store.cartItems[i].item.id == this.props.itemID){
          this.props.store.cartItems[i].item.pintPrice = (this.state.gallon * this.state.value)
          this.updateGrandTotal()
          return this.props.store.cartItems[i].item.pintPrice 
        }
      }
    } 
  }

  updateTotal() {
    this.setState({total: (this.state.price * this.state.value)})
    this.props.updateQuantity(this.props.itemID, this.state.value)
    this.props.productTotal(this.props.itemID, this.state.total)
    console.tron.log('this.props.store ',this.props.store)
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
      // console.log(this.props.store.cartItems[i].item.pintPrice)
    }
    // console.log(nowTotal)
    // console.log('ADD_TO_TOTAL ' + this.props.addToTotal)
    this.props.addToTotal(nowTotal)
    console.tron.log('this.state.price in updateGrandTotal=> ',this.state.total)
    console.tron.log('this.state.value=> ',this.state.value)

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
  addToTotalCart: (product, id) => dispatch({type: 'ADD_TOTAL_TO_CART', payload: product, id: id}),
  updateQuantity: (id, num) => dispatch({type: 'UPDATE_QUANTITY', payload: id, count: num}),
  updateSelectedIndex: (id, num) => dispatch({type: 'UPDATE_INDEX', payload: id, count: num}),
  productTotal: (id, num) => dispatch({type: 'PRODUCT_TOTAL', payload: id, total: num})
})

export default connect(mapStoreToProps, mapDispatchToProps)(CartButtonGroup)
