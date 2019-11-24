import React from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import Banner from '../Components/Banner'
import Shop from '../Components/Shop'
import MyAvatar from '../Components/Avatar'
import AduFlavors from '../WaterIce/AduFlavors'
import Search from '../Components/SearchBar'


const AdultScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.banner}>
      <Banner />
    </View>
      <Shop />
      <Search />
      <MyAvatar />
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
    flex: 1,
    position: 'relative',
    top: 200,
    width: '100%',
    justifyContent: 'space-between',
  },
  banner: {
    flex: 1,
    position: 'absolute',
    top: 40,
    alignItems: 'center',
    // width: '100%',
    height: 200,  
  },
})

export default AdultScreen