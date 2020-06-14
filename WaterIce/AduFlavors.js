import React, { useState, useEffect } from 'react'
import { 
    FlatList, 
    View, 
    SafeAreaView, 
    StyleSheet, 
    ScrollView,
    Dimensions
} from 'react-native'
import firebase from 'react-native-firebase' 
import ItemCard from '../Components/ItemCard'
import { connect } from 'react-redux'

const AduFlavors = props => {
  const [aduFlavors, setAduFlavors] = useState([])
  // const [isSearching, setIsSearching] = useState(false)
  // const [refresh, setRefresh] = useState(false)
  
  useEffect(() => { 
    first() 
  }, []
  )

  const first = async () => {
    // put items in firebase under collection Adults
      const getAduFlavors = await firebase.firestore().collection('Snacks').get()
        // put this in redux to see if theres a change also needs to be in redux to 
        // make the search work
        getAduFlavors.docs.forEach( doc => {
          // console.log(doc)
          props.addToSnacks({
              names: doc.id,
              image: doc._data.image,
              details: doc._data.description,
              pint: doc._data.price,
              // gallon: doc._data.priceTwo
          })
        })
        // console.log('====================================')
        // console.log('flavor', aduFlavors)
        // console.log('redux flavors', props.cartItems)
        // console.log('====================================')
  }

    let index = 0

    return (
      <ScrollView 
      contentContainerStyle={styles.container}
      >
        <FlatList
            data={props.cartItems.renderSnacks}
            keyExtractor={(item, index) => index.toString()}
            numColumns='2'
            extraData={props.cartItems.renderSnacks}
            renderItem = {({item}) =>
        <ItemCard
            name={item.snacks.names}
            pic={{uri: item.snacks.image}}
            discription={item.snacks.details || null}
            toCart={props.addItemToCart}
            remove={props.removeItem}
            itemId={index++}
            pintPrice={item.snacks.pint}
            // gallonPrice={item.snacks.gallon}
            quantity={1}
            total={item.snacks.pint}
        /> 
        }
        />
      </ScrollView>
    )   
}

const mapStoreToProps = (store) => {
  return {
      cartItems: store
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      addItemToCart:(product) => dispatch({type:'ADD_TO_CART',
        payload:product}),
      removeItem: (product) => dispatch({type: 'REMOVE_FROM_CART', 
        payload: product}),
      addToSnacks: (snack) => dispatch({type: 'ADD_TO_SNACKS', 
      payload: snack})
  }
}
// the styling is being handled in the ItemCard file
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 0,
    padding: 0
  }
})

export default connect(mapStoreToProps, mapDispatchToProps)(AduFlavors)