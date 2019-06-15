import React from 'react' 
import { View, Text, StyleSheet } from 'react-native' 
import firebase from 'react-native-firebase' 
import Login from './screens/Login' 

class App extends React.Component {

  constructor() {
    super() 
    this.unsubscriber = null 
    this.state = {
      user: null,
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

  render() {
    if (!this.state.user) {
      return <Login /> 
    }

    return (
      // this is where my stack navagator should be 
      <View style={styles.container}>
        <Text>Welcome to my awesome app {this.state.user.email}!</Text>
      </View>
    ) 
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App 