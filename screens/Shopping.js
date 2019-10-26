import React from 'react'
import { Text, View, SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Card, Button, Input, Overlay, ListItem, ButtonGroup, Slider, Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import RegFlavors from '../WaterIce/RegFlavors'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase' 

class ShopScreen extends React.Component {
  static navigationOptions =  {
    title: 'Review order',
    headerLeft: null,
    gesturesEnabled: false,
  }
  constructor () {
    super()
    this.state = {
      selectedIndex: 2,
      value: 1,
      name: null,
      phone: null,
      address: null,
      instructions: null
    }
    this.updateIndex = this.updateIndex.bind(this)
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
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
render(){
  const total = '$0.00'
  const payment = '     Cash'
  const img = 'https://cdn2.stylecraze.com/wp-content/uploads/2013/08/591_13-Best-Benefits-Of-Black-Cherries-For-Skin-Hair-And-Health_iStock-827654834.jpg'
  const buttons = ['Sm', 'Md', 'Lg']
  const { selectedIndex } = this.state

  return (
    <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
      {this.props.cartItems.length > -1 ? 
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

      <Card containerStyle={styles.cartCard} >
        <ListItem
          leftAvatar={{
            source: { uri: img }
          }}
          title="Black Cherry"
          subtitle="Water Ice"
        />
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          selectedButtonStyle={{backgroundColor:'#03A9F4'}}
          containerStyle={{height: 25, width: 200}}
        />
        <View style={styles.slider}>
          <Slider
            value={this.state.value}
            onValueChange={value => this.setState({ value })}
            minimumValue={0}
            maximumValue={10}
            thumbTintColor='#03A9F4'
            minimumTrackTintColor='#03A9F4'
            step={1}
          />
          <Text style={{height:20}}>Quantity: {this.state.value}</Text>
        </View>
      </Card>

      <Card containerStyle={styles.card} style={{display:'flex',flexDirection:'column'}}>
        <Text>Tip*</Text>
        <Text>{total}</Text>
      </Card>


      <Button 
        title={`Place your order: ${total}`}
        buttonStyle={styles.payment}
      />

      <Button 
        onPress={this.props.removeItem}
        // this will remove cart items
        title = "X"
        buttonStyle={{marginTop:20, backgroundColor:'#d9534f'}}
        // this below is where we map the cart items
        // {this.props.cartItems}
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
    marginTop: 25
  },
  slider: {
    flex: 1, 
    alignItems: 'stretch', 
    justifyContent: 'center',
    marginTop: 35
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ShopScreen)) 