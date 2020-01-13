import React from 'react' 
import firebase from 'react-native-firebase' 
import Login from './screens/Login' 
import BottomTab from './Components/BottomTab'
// import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import cartItems from "./reducers/cartItems"
import cartTotal from "./reducers/cartTotal"
import renderSnacks from "./reducers/renderSnacks"
import renderWater from "./reducers/renderWater"
import renderUsers from "./reducers/renderUsers"
import { createStore, combineReducers } from 'redux'

const rootReducer = combineReducers({cartItems, cartTotal, renderSnacks, renderWater, renderUsers})
const store = createStore(rootReducer)
class App extends React.Component {

  constructor() {
    super() 
    // this.userInfo = firebase.firestore().collection('userInfo').doc('personal')
    this.unsubscriber = null 
    this.state = {
      user: null
    } 
  }

  /**
   * Listen for any auth state changes and update component state
   */
  componentDidMount() {
    // SplashScreen.hide()
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