import React from 'react' 
import firebase from 'react-native-firebase' 
import Login from './screens/Login' 
import BottomTab from './Components/BottomTab'
import AdminNav from './Components/Admin'
import { Provider } from 'react-redux'
import cartItems from "./reducers/cartItems"
import cartTotal from "./reducers/cartTotal"
import { createStore, combineReducers } from 'redux'

const rootReducer = combineReducers({cartItems, cartTotal})
const store = createStore(rootReducer)
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
    
    // This will return the admin app
    // if ('The user is an Admin User') {
    //   return <AdminNav /> 
    // }

    return (
      <Provider store={store}>
          <BottomTab />
      </Provider>
    ) 
  }
}

export default App 