import React from 'react'
import { Text, View, SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Card, Button, Input, Overlay, ListItem, Slider, Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import RegFlavors from '../WaterIce/RegFlavors'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase' 
import CartButtonGroup from '../Components/CartButtonGroup'
import Swipeout from 'react-native-swipeout'

class ShopScreen extends React.Component {
  static navigationOptions =  {
    title: 'Review order',
    headerLeft: null,
    gesturesEnabled: false,
  }
  constructor () {
    super()
    this.state = {
      value: 1,
      name: null,
      phone: null,
      address: null,
      instructions: null
    }
    const email = firebase.auth().currentUser.email    
    this.ref = firebase.firestore().collection('Users').doc(email)
  }
  componentDidMount() {
    this.ref.onSnapshot(userInfo => {
      this.setState({
        name: userInfo._data.Name,
        phone: userInfo._data.Phone,
        address: userInfo._data.Address
      })
    })
  }
render(){
  const total = '$0.00'
  const payment = '     Cash'
  const swipeoutBtns = (item) => {
  return [
    {
      text: 'Remove',
      backgroundColor: '#d9534f',
      onPress: ()=> this.props.removeItem(item)
    }
  ]
  }

  return (
    <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
      {this.props.cartItems.length > 0 ? 
      // here is where I put my custom component that renders shopping cart items with info like price/size, picture, name etc.
      //might have to use a flatlist or map over all items in cart
      <>
      {/* center this text by align center */}
      <View style={styles.section}><Text style={styles.sectionText}>        Your Infomation</Text></View>

      <Card containerStyle={styles.card}>
        <Text>Contact info*</Text>
        <Text>{this.state.name}</Text>
        <Text>{this.state.phone}</Text>
      </Card>

      <Card containerStyle={styles.card}>
        <Text>Deliver to*</Text>
        <Text>{this.state.address}</Text>
      </Card>

      <Card containerStyle={styles.card}>
        <Text>Ordering instructions</Text>
        <Input 
          placeholder='your order instructions'
          onChangeText={(custom) => this.setState({instructions: custom})}
        />
      </Card>

      <View style={styles.section}><Text style={styles.sectionText}>        Your Payment</Text></View>

      <Card containerStyle={styles.card}>
        <ListItem
          chevron
          title="Payment Options* "
          
          badge={{ 
            value: payment, 
            textStyle: { color: 'white', fontSize:15, right:10 },
            badgeStyle: {backgroundColor:'#03A9F4', height:25 }
          }}
        />
      </Card>
      
      {this.props.cartItems.map(flavor => (
        <Swipeout backgroundColor="#e8e8e8" 
          right={swipeoutBtns(flavor.item)} 
          autoClose={true} 
          key={flavor.item.id}>
          <Card containerStyle={styles.cartCard} key={flavor.item.id}>
            <ListItem
              key={flavor.item.id}
              leftAvatar={{
                source: flavor.item.pic  
              }}
              title={flavor.item.name}
              subtitle={flavor.item.item}
            />
            <CartButtonGroup />
          </Card>
        </Swipeout>
      ))}

      <Card containerStyle={styles.card} style={{display:'flex',flexDirection:'column'}}>
        <Text>Tip*</Text>
        <Text>{total}</Text>
      </Card>
      
      {/* Grand Total needs to be in this button.  This needs to be a seperate component to += total */}
      <Button 
        title={`Place your order: ${this.props.cartItems.total || null}`}
        buttonStyle={styles.payment}
        onPress={()=> this.props.addToTotal({total:5})}
      />
      </>
      
      // what the shopping cart show when empty
      :<Text>Welcome to the shopping cart</Text>
      }
    </View>
    </ScrollView>
  )
  }
}

const sectionWidth = Dimensions.get('window').width

const mapStateToProps = (state) => {
  return {
      cartItems: state
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeItem: (product) => dispatch({type: 'REMOVE_FROM_CART', payload: product}),
  addToTotal: (price) => dispatch({type: 'ADD_TO_TOTAL', payload: price})

})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    position: 'relative',
    backgroundColor: '#e8e8e8',
  },
  section: {
    marginTop: 25,
    width: sectionWidth,
    height: 25,
    backgroundColor: '#dcdcdc',
  },
  sectionText: {
    fontWeight: 'bold',
    marginTop: 3
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
    shadowRadius: 0,
  },
  cartCard: {
    display: 'flex',
    flexDirection: 'column',
    height: 200,
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
    margin: 30
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ShopScreen)) 