import React from 'react' 
import { View, Text, StyleSheet, TextInput } from 'react-native' 
import firebase from 'react-native-firebase' 
import Login from './screens/Login' 
import { Button, Input } from 'react-native-elements';

class App extends React.Component {

  constructor() {
    super() 
    // this.userInfo = firebase.firestore().collection('userInfo').doc('personal')
    this.unsubscriber = null 
    this.state = {
      user: null,
      address: null,
      order: null
    } 
  }

  /**
   * Listen for any auth state changes and update component state
   */
  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user }) 
    }) 
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber() 
    }
  }

  logOut(){
    firebase.auth().signOut()
  }

  data = () => {
    const { address, order } = this.state
    // use context to maintain doc name to keep user info seperate
    this.userInfo = firebase.firestore().collection('userInfo').doc('My Unique Name')
      firebase.firestore().runTransaction(async transaction => {
          const doc = await transaction.get(this.userInfo);
          // if it does not exist set the population to one
          if (doc.exists) {
            transaction.update(this.userInfo, { adresses: address, orders: order })
          }
      })
  }

  render() {
    if (!this.state.user) {
      return <Login /> 
    }

    return (
      // this is where my stack navagator should be 
      <View style={styles.container}>
        <Text>Welcome Back {this.state.user.email}!</Text>
        <Input
        placeholder='address'
        onChangeText={(text) => this.setState({address:text})}
        />
        <Input
        placeholder='order'
        onChangeText={(text) => this.setState({order:text})}
        />
        <Button 
          onPress={()=>this.data()}
          title='database'
          />
        <Button 
          onPress={()=>this.logOut()}
          title='log out'
          />
      </View>
    ) 
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})

export default App 