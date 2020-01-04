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
  // const [aduFlavorsTwo, setAduFlavorsTwo] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [refresh, setRefresh] = useState(false)
  
  useEffect(() => {
    first()
  },
  []
  )

  const first = async () => {
    // put items in firebase under collection Adults
      const getAduFlavors = await firebase.firestore().collection('Snacks').get()
        // put this in redux to see if theres a change also needs to be in redux to 
        // make the search work
        getAduFlavors.docs.forEach( doc => {
          console.log(doc)
          setAduFlavors([...aduFlavors, aduFlavors.push({
                names: doc.id,
                image: doc._data.image,
                details: doc._data.description,
                pint: doc._data.price,
                gallon: doc._data.priceTwo,
              })])
        })
          // console.log('====================================')
          console.log(aduFlavors)
          // console.log('====================================')
  }

    let index = 0

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
            // extraData={props}
            // refreshing={true}
            renderItem={({item}) => 
            <ItemCard
                name={item.names}
                pic={{uri: item.image}}
                discription={item.details || null}
                toCart={props.addItemToCart}
                remove={props.removeItem}
                itemId={index++}
                pintPrice={item.pint}
                gallonPrice={item.gallon}
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
// the styling is being handled in the ItemCard file
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  card: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
  },
})

export default connect(mapStoreToProps, mapDispatchToProps)(AduFlavors)