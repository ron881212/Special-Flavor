import React from 'react'
import { Text, View, SafeAreaView, StyleSheet, Platform } from 'react-native'
import Banner from '../Components/Banner'
import AduFlavors from '../WaterIce/AduFlavors'

const AdultScreen = props => {
  return (
    <SafeAreaView style={styles.container}>

      <Banner />

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
    backgroundColor: '#dddddd'
  },
  cards: {
    position:'relative',
    // marginBottom:'20%',
    paddingBottom:220
  }
})

export default AdultScreen