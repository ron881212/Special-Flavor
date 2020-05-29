import React, { useEffect, useState } from 'react'
import { Platform, View, SafeAreaView, StyleSheet } from 'react-native'
import Banner from '../Components/Banner'
import Shop from '../Components/Shop'
import MyAvatar from '../Components/Avatar'
import RegFlavors from '../WaterIce/RegFlavors'
import Search from '../Components/SearchBar'
import firebase from 'react-native-firebase' 
import { connect } from 'react-redux'
import Fire from '../Components/Fire'

const FlavorScreen = props => {

  useEffect(() => {
    start()
  },[])

  const start = async (a) => {
    Fire.customUid = firebase.auth().currentUser.uid
    const getFlavors = await firebase.firestore().collection('Flavors').get()
    getFlavors.docs.forEach( doc => {
        props.addToWaterIce(
            {
              names: doc.id,
              image: doc._data.image,
              details: doc._data.description,
            }
        )
    })
  }

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

FlavorScreen.navigationOptions = {
  headerMode: 'screen',
  headerShown: false
}

const mapDispatchToProps = (dispatch) => ({
  removeItem: (product) => dispatch({type: 'REMOVE_FROM_CART',payload: product}),
  addItemToCart:(product) => dispatch({type:'ADD_TO_CART',payload:product}),   
  addToTotal: (price) => dispatch({type: 'ADD_TO_TOTAL', payload: price}),  
  subFromTotal: (price) => dispatch({type: 'REMOVE_TO_TOTAL', payload: price}),
  addToWaterIce: (waterIce) => dispatch({type: 'ADD_TO_WATER_ICE', payload: waterIce})
})

const mapStateToProps = (state) => {
  return {
      cartItems: state
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#dddddd'
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

export default connect(mapStateToProps, mapDispatchToProps)(FlavorScreen)
