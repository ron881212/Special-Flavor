import React from 'react' 
import firebase from 'react-native-firebase' 
import Login from './screens/Login' 
import BottomTab from './Components/BottomTab'
import AdminNav from './Components/Admin'
// import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import cartItems from "./reducers/cartItems"
import cartTotal from "./reducers/cartTotal"
import renderSnacks from "./reducers/renderSnacks"
import renderWater from "./reducers/renderWater"
import { createStore, combineReducers } from 'redux'

const rootReducer = combineReducers({cartItems, cartTotal, renderSnacks, renderWater})
const store = createStore(rootReducer)
class App extends React.Component {

  constructor() {
    super() 
    // this.userInfo = firebase.firestore().collection('userInfo').doc('personal')
    this.unsubscriber = null 
    this.state = {
      user: null,
      admin:false
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
    firebase.auth().currentUser.getIdTokenResult()
    .then((idTokenResult) => {
      if(idTokenResult.claims.adminForApp){
        this.setState({admin:true})
        // return (
        //   <Provider store={store}>
        //     <AdminNav />
        // </Provider>
        // )
      }
      console.log(idTokenResult.claims)
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
    if(this.state.admin == true) {
      return (
        <Provider store={store}>
            <AdminNav />
        </Provider>
      ) 
    } else return (
        <Provider store={store}>
            <BottomTab />
        </Provider>
      )
  }
}

export default App 