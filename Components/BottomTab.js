import React from 'react'
import { Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/FontAwesome5'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
// import shoppingCart from '../Components/Shop'
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
import firebase from 'react-native-firebase' 
// import AdminNav from './Admin'
import Users from '../screens/Users'

class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    )
  }
}

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={0} />
}

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state
  let IconComponent = Ionicons
  let iconName
  if (routeName === 'Water Ice') {
    iconName = `glass-whiskey`
    IconComponent = HomeIconWithBadge
  } else if (routeName === 'Snacks') {
    iconName = `cookie`
  } else if (routeName === 'Boards') {
    iconName = `comments`
  } else if (routeName === 'Profile') {
    iconName = `id-card`
  } else if (routeName === 'Users') {
    iconName = `users`
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
    ChangeEmail: { screen: ChangeEmail },
    Shop: { screen: ShopScreen }
  },
    { 
      initialRouteName: 'MyProfile'
    },
)

const Nav = createAppContainer(
  createBottomTabNavigator(
    {
      'Water Ice': { screen: FlavorScreen },
      Snacks: { screen: AdultScreen },
      Boards: { screen: MerchScreen },
      Profile,
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'purple',
        inactiveTintColor: 'gray',
      },
    }
  )
)

const Admin = createAppContainer(
  createBottomTabNavigator(
    {
      'Water Ice': { screen: FlavorScreen },
      Snacks: { screen: AdultScreen },
      Boards: { screen: MerchScreen },
      Profile,
      Users: { screen: Users },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'purple',
        inactiveTintColor: 'gray',
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
    firebase.auth().currentUser.getIdTokenResult()
    .then((idTokenResult) => {
      if(idTokenResult.claims.adminForApp){
        this.setState({admin:true})
      }
      console.log(idTokenResult.claims)
    })
  }
  render() {
    if(this.state.admin){
      return <Admin />
    } 
    else return <Nav />

  }
}

export default BottomNav
