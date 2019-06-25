import React from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import Banner from '../Components/Banner'
import Shop from '../Components/Shop'
import MyAvatar from '../Components/Avatar'
import RegFlavors from '../WaterIce/RegFlavors'

const FlavorScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
        <Banner />
        <Shop />
        <MyAvatar />
        <RegFlavors />
    </SafeAreaView>
  )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    cards: {
      flex: 1,
      flexDirection: 'row', 
      width: '50%',
      height: 40,
      justifyContent: 'space-evenly'
      // height: '25%'
    }
})

export default FlavorScreen
