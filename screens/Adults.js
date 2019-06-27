import React from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import Banner from '../Components/Banner'
import Shop from '../Components/Shop'
import MyAvatar from '../Components/Avatar'
import AduFlavors from '../WaterIce/AduFlavors'

const AdultScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Banner />
      <Shop />
      <MyAvatar />
      <AduFlavors />
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

export default AdultScreen