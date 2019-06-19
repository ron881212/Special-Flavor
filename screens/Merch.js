import React from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import Banner from '../Components/Banner'

const MerchScreen = props => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Banner />
      <Text>Merch!</Text>
    </SafeAreaView>
  )
}


export default MerchScreen