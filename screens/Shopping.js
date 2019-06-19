import React from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'

const ShopScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome to the shopping cart!</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})

export default ShopScreen