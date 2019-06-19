import React from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import Banner from '../Components/Banner'

const AdultScreen = props => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Banner />
      <Text>Adults!</Text>
    </SafeAreaView>
  )
}


export default AdultScreen