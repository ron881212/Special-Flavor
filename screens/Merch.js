import React from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import Banner from '../Components/Banner'
import Shop from '../Components/Shop'

const MerchScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Banner />
      <Shop />
      <Text>Merch!</Text>
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

export default MerchScreen