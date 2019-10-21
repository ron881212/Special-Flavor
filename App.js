import React from 'react' 
import firebase from 'react-native-firebase' 
import Login from './screens/Login' 
import BottomTab from './Components/BottomTab'
import store from './store'
import { Provider } from 'react-redux'
// import ShoppingCart from './Components/Shop'

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
      <Provider store={store}>
        <BottomTab />
      </Provider>
    ) 
  }
}

export default App 