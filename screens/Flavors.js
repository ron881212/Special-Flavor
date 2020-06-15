import React, { useEffect, useState } from 'react'
import { Platform, View, SafeAreaView, StyleSheet } from 'react-native'
import Banner from '../Components/Banner'
import RegFlavors from '../WaterIce/RegFlavors'
import firebase from 'react-native-firebase' 
import { connect } from 'react-redux'
import Fire from '../Components/Fire'

const FlavorScreen = props => {
  
  useEffect(() => {
    let task = false
    const start = async (a) => {
      Fire.customUid = firebase.auth().currentUser.uid
      const getFlavors = await firebase.firestore().collection('Flavors').get()
      if(!task){
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
    }
    start()
    return () => {
      task = true
    }
  },[])

  // StatusBar.setBackgroundColor('black')

  return (
    <SafeAreaView style={styles.container}>

      <Banner />

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
      position:'relative',
      // marginBottom:'20%',
      paddingBottom:220
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(FlavorScreen)
