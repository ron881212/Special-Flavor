import React from 'react' 
import { View, Text, StyleSheet, TextInput } from 'react-native' 
import firebase from 'react-native-firebase' 
import Login from './screens/Login' 
import BottomTab from './Components/BottomTab'
import { Button, Input } from 'react-native-elements'

class App extends React.Component {

  constructor() {
    super() 
    // this.userInfo = firebase.firestore().collection('userInfo').doc('personal')
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
        <BottomTab />
    ) 
  }
}

export default App 