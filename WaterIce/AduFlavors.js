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

const AduFlavors = props => {

  const [aduFlavors, setAduFlavors] = useState([])
  const [aduSearchFlavors, setaduSearchFlavors] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    first()
  }, [])

  const first = async () => {
    // put items in firebase under collection AduFlavors
      const getAduFlavors = await firebase.firestore().collection('AduFlavors').get()
      getAduFlavors.docs.forEach( doc => {
        setAduFlavors([...aduFlavors, aduFlavors.push({
              names: doc.id,
              image: doc._data.image,
              details: doc._data.description
      })])

      })
      console.log('====================================')
      console.log(aduFlavors)
      console.log('====================================')
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
            />
            }
        />
      </ScrollView>

      :

      null
    )   
}

const mapDispatchToProps = (dispatch) => {
  return{
      addItemToCart:(product) => dispatch({type:'ADD_TO_CART',
      payload:product})
  }
}

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

export default connect(null, mapDispatchToProps)(AduFlavors)