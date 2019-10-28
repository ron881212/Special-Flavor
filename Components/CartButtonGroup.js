import React from 'react'
import { Text, View } from 'react-native'
import { ButtonGroup, Slider, Button } from 'react-native-elements'

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
  }
  
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    if(selectedIndex == 0) {
        this.setState({price: 5})
        this.setState({total: (5 * this.state.value)})
    }
    if(selectedIndex == 1) {
        this.setState({price: 30})
        this.setState({total: (30 * this.state.value)})
    } 
    // this.setState({total: (this.state.price * this.state.value)})
  }
  updateTotal () {
    this.setState({total: (this.state.price * this.state.value)})
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
      <Text>price: {this.state.price}      total: {this.state.total}</Text>
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

export default CartButtonGroup
