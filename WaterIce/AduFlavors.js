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
import { Card, ListItem, Button, Icon, Image } from 'react-native-elements'
import ItemCard from '../Components/ItemCard'
import { connect } from 'react-redux'
// import cartItems from '../reducers/cartItems'

const AduFlavors = props => {

  const [aduFlavors, setAduFlavors] = useState([])
  const [aduSearchFlavors, setaduSearchFlavors] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    first()
  }, [])

  const first = async () => {
    // put items in firebase under collection Adults
      const getAduFlavors = await firebase.firestore().collection('Adults').get()
      getAduFlavors.docs.forEach( doc => {
        setAduFlavors([...aduFlavors, aduFlavors.push({
              names: doc.id,
              image: doc._data.image,
              details: doc._data.description
      })])

      })
      // console.log('====================================')
      // console.log(aduFlavors)
      // console.log('====================================')

  }

    return (
      !isSearching ?

      <ScrollView 
      contentContainerStyle={styles.container}
      >

        {/* import itemCard to Searchbar put searched items into a card;
            searchFlavors ? newFlatlist : original Flatlist; // okay
            grab searchbar component use props for onchangetext and vaule;
            move state and updateSearch to this component;

        */}
        <FlatList
            data={aduFlavors}
            keyExtractor={(item, index) => index.toString()}
            numColumns='2'
            // columnWrapperStyle={styles.container}
            renderItem={({item}) => 
            <ItemCard
                name={item.names}
                pic={{uri: item.image}}
                discription={item.details || null}
                toCart={props.addItemToCart}
                remove={props.removeItem}
            />
            }
        />

        
      </ScrollView>

      :

      null
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
      removeItem: (product) => dispatch({type: 'REMOVE_FROM_CART',     payload: product})
  }
}
// console.log(props.addItemToCart)
// the styling is being handled in the ItemCard file
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 175
  },
  card: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      height: 'auto'
  },
})

export default connect(mapStoreToProps, mapDispatchToProps)(AduFlavors)