import React from 'react'
import { Text, View, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import { Card, Button, Divider, Avatar, ListItem, ButtonGroup } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import RegFlavors from '../WaterIce/RegFlavors'
import { connect } from 'react-redux'

class ShopScreen extends React.Component {
  static navigationOptions =  {
    title: 'Review order',
    headerLeft: null,
    gesturesEnabled: false,
  }
  constructor () {
    super()
    this.state = {
      selectedIndex: 2
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
render(){
  const total = '$0.00'
  const payment = '     Cash'
  const img = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
  const buttons = ['Sm', 'Md', 'Lg']
  const { selectedIndex } = this.state

  return (
    <View style={styles.container}>
      {this.props.cartItems.length > -1 ? 
      // here is where I put my custom component that renders shopping cart items with info like price/size, picture, name etc.
      //might have to use a flatlist or map over all items in cart
      <>
      {/* center this text by align center */}
      <View style={styles.section}><Text style={styles.sectionText}>        Your Infomation</Text></View>
      <Card containerStyle={styles.card}><Text>Contact info</Text></Card>
      <Card containerStyle={styles.card}><Text>Deliver to*</Text></Card>
      <Card containerStyle={styles.card}><Text>Ordering instructions</Text></Card>
      <View style={styles.section}><Text style={styles.sectionText}>        Your Payment</Text></View>
      <Card containerStyle={styles.card}><Text>{`Payment* ${payment}`}</Text></Card>

      <Card containerStyle={styles.card}>
        <ListItem
          leftAvatar={{
            source: { uri: img }
          }}
          title="Black Cherry"
          subtitle="Water Ice"
          chevron
        />
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 25, width: 200}}
        />
      </Card>
      


      <Button 
        title={`Place your order: ${total}`}
        buttonStyle={styles.payment}
      />

      <Button 
        onPress={this.props.removeItem}
        // this will remove cart items
        title = "X"
        buttonStyle={{marginTop:50, backgroundColor:'#d9534f'}}
        // this below is where we map the cart items
        // {this.props.cartItems}
      />
      </>
      
      // what the shopping cart show when empty
      :<Text>Welcome to the shopping cart</Text>
      }
    </View>
  )
  }
}

const sectionWidth = Dimensions.get('window').width

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
    backgroundColor: '#e8e8e8',
    justifyContent: 'flex-start',
  },
  section: {
    marginTop: 25,
    width: sectionWidth,
    height: 25,
    backgroundColor: '#dcdcdc',
    // alignItems: 'stretch'
  },
  sectionText: {
    fontWeight: 'bold',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
    borderColor: 'white',
    width: sectionWidth / 1.1,
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0, //default is 1
    shadowRadius: 0
  },
  payment: {
    display: 'flex',
    backgroundColor: '#5cb85c',
    width: sectionWidth / 1.1,
    marginTop: 25
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ShopScreen)) 