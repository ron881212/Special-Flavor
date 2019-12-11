import React from 'react'
import { Platform, View, SafeAreaView, StyleSheet } from 'react-native'
import Banner from '../Components/Banner'
import Shop from '../Components/Shop'
import MyAvatar from '../Components/Avatar'
import RegFlavors from '../WaterIce/RegFlavors'
import Search from '../Components/SearchBar'

const ComponentView = Platform.select({
  ios: () => require('SafeAreaView'),
  android: () => require('View'),
})()

const FlavorScreen = props => {

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.banner}>
        <Banner />
      </View>

      <MyAvatar />
      <Shop />

      <View style={styles.bar}>
        <Search />
      </View>
      
      <View style={styles.cards}>
        <RegFlavors />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'whitesmoke'
    },
    cards: {
      top: 180,
    },
    banner: {
      flex: 1,
    },
    bar: {
      top: 140
    }
})

export default FlavorScreen
