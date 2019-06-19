import React from 'react'
import { Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { 
  createBottomTabNavigator, 
  createAppContainer,
  createStackNavigator
} from 'react-navigation'

import FlavorScreen from '../screens/Flavors'
import AdultScreen from '../screens/Adults'
import MerchScreen from '../screens/Merch'
import ProfileScreen from '../screens/Profile'
import ShopScreen from '../screens/Shopping'

class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // /If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
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
  if (routeName === 'Flavors') {
    iconName = `ios-information-circle`
    IconComponent = HomeIconWithBadge
  } else if (routeName === 'Adults') {
    iconName = `ios-options`
  } else if (routeName === 'Merch') {
    iconName = `ios-options`
  } else if (routeName === 'Profile') {
    iconName = `ios-options`
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />
}


// const Flavors = createStackNavigator({
//   Flavors: { screen: FlavorScreen },  
//   Shop: { screen: ShopScreen }
// })
// const Adults = createStackNavigator({
//   Adults: { screen: AdultScreen },
//   Shop: { screen: ShopScreen }
// })
// const Merch = createStackNavigator({
//   Merch: { screen: MerchScreen },
//   Shop: { screen: ShopScreen }
// })

export default createAppContainer(
  createBottomTabNavigator(
    {
      Flavors: { screen: FlavorScreen },
      Adults: { screen: AdultScreen },
      Merch: { screen: MerchScreen },
      Profile: { screen: ProfileScreen },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
      },
    }
  )
)
