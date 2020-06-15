import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/FontAwesome5'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import FlavorScreen from '../screens/Flavors'
import AdultScreen from '../screens/Adults'
import MerchScreen from '../screens/Merch'
import ProfileScreen from '../screens/Profile'
import ShopScreen from '../screens/Shopping'
import EditAddress from '../screens/EditAddress'
import EditName from '../screens/EditName'
import EditPhone from '../screens/EditPhone'
import ChangePassword from '../screens/ChangePassword'
import ChangeEmail from '../screens/ChangeEmail'
import PersonalChat from '../screens/PersonalChat'
import firebase from 'react-native-firebase' 
import AllUsers from '../screens/Users'
import IconWithBadge from '../Components/IconWithBadge'

const ChatIconWithBadge = props => {
  let count = 0
  // let newCount = props.incoming.messageCount
  return <IconWithBadge {...props} />
}

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName, name } = navigation.state
  let IconComponent = Ionicons
  let iconName
  if (routeName === 'WaterIce') {
    iconName = `glass-whiskey`
  } else if (routeName === 'Snacks') {
    iconName = `cookie`
  } else if (routeName === 'Boards') {
    iconName = `comments`  
    // name = 'welcome'
    IconComponent = ChatIconWithBadge
  } else if (routeName === 'Profile') {
    iconName = `id-card`
  } else if (routeName === 'Users') {
    iconName = `users`
  } else if (routeName === 'Customer') {
    iconName = `user`
  } else if (routeName === 'Order') {
    iconName = `comment-dots`
  }
    
  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />
}

const Profile = createStackNavigator(
  {
    MyProfile: { screen: ProfileScreen },  
    EditAddress: { screen: EditAddress },
    EditName: { screen: EditName },
    EditPhone: { screen: EditPhone },
    ChangePassword: { screen: ChangePassword },
    ChangeEmail: { screen: ChangeEmail }
  },
    { 
      initialRouteName: 'MyProfile'
    },
)

const WaterIce = createStackNavigator(
  {
    'Water Ice': { screen: FlavorScreen },  
    Customer: {screen: PersonalChat},
    Shop: { screen: ShopScreen }
  },
    { 
      initialRouteName: 'Water Ice',
      initialRouteKey: 'Water Ice'
    },
)

// // This is to be a hook function the returns createAppContainer
function Nav(props) {
  // static navigationOptions 
  // let screenName = props.name
  const UserNav = createAppContainer(
    createBottomTabNavigator(
      {
        WaterIce,
        Snacks: { screen: AdultScreen },
        // MerchScreen needs to be props.MerchScreen 
        Boards: { screen: MerchScreen },
        Profile,
      },
      {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => 
          getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
          style:{height:50},
          activeTintColor: 'purple',
          inactiveTintColor: 'gray',   
          showLabel: false
        }
      }
      )
  )
    return(
      <UserNav />
    )
}

const Admin = createAppContainer(
  // pass props through here
  createBottomTabNavigator(
    {
      WaterIce,
      Snacks: { screen: AdultScreen },
      Boards: { screen: MerchScreen },
      Profile,
      Users: { screen: AllUsers },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        style:{height:40},
        activeTintColor: 'purple',
        inactiveTintColor: 'gray',
        showLabel: false
      },
    }
  )
)

class BottomNav extends React.Component {
  constructor() {
    super() 
    this.state = {
      admin:false
    } 
  }
  componentDidMount() {
    this.mounted = false
    firebase.auth().currentUser.getIdTokenResult()
    .then((idTokenResult) => {
      if(!this.mounted){
        if(idTokenResult.claims.adminForApp){
        this.setState({admin:true})
        }
      }
      // Nav.
      // console.log(idTokenResult.claims)
    })
  }

  componentWillUnmount(){
    this.mounted = true
  }

  render() {
    if(this.state.admin){
      return <Admin />
    } 
    else return <Nav />
  }
}

export default BottomNav
