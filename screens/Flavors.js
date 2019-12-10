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
        <View style={styles.bar}>
          <Search />
        </View>
      </View>
        <View style={styles.cards}>
          <RegFlavors />
        </View>
        <Shop />
        <MyAvatar />
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
      flex: 1,
      position: 'relative',
      top: -150,
      // width: '100%',
      // top: -170,
      // height: 400,
      justifyContent: 'space-between',
    },
    banner: {
      flex: 1,
      padding:0,
      margin:0,
      alignItems: 'center',
    },
    bar: {
      position: 'relative',
      top: -65
    },
})

export default FlavorScreen
