import React from 'react'
import { Text, View, SafeAreaView, StyleSheet, Button } from 'react-native'
import { withNavigation } from 'react-navigation'

class ShopScreen extends React.Component {
static navigationOptions =  {
    title: 'Shopping Cart',
    headerLeft: null,
    gesturesEnabled: false,
  }

render(){
  return (
    <View style={styles.container}>
      <Text>Welcome to the shopping cart!</Text>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})

export default withNavigation(ShopScreen)