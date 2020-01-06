import React from 'react'
import { Text, View, SafeAreaView, StyleSheet, Platform } from 'react-native'
import Banner from '../Components/Banner'
import Shop from '../Components/Shop'
import MyAvatar from '../Components/Avatar'
import AduFlavors from '../WaterIce/AduFlavors'
// import AduFlavorsTwo from '../WaterIce/AduFlavorsTwo'
import Search from '../Components/SearchBar'


const AdultScreen = props => {
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
        <AduFlavors />
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
    top:'8%',
    position:'relative',
    paddingTop: '20%',
  },
  banner: {
    flex: 1,
  },
  bar: {
    top: '24%',
    position: 'absolute',
    zIndex: 10
  }
})

export default AdultScreen