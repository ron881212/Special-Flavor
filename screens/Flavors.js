import React from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import Banner from '../Components/Banner'
import Shop from '../Components/Shop'
import MyAvatar from '../Components/Avatar'
import RegFlavors from '../WaterIce/RegFlavors'
import Search from '../Components/SearchBar'

const FlavorScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <Banner />
      </View>
        <Shop />
        <Search />
        <MyAvatar />
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
      flex: 1,
      position: 'relative',
      top: 160,
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

export default FlavorScreen
