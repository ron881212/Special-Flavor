import React, { useState, useEffect } from 'react'
import { 
    FlatList, 
    StyleSheet, 
    ScrollView,
} from 'react-native'
import firebase from 'react-native-firebase' 
import ItemCard from '../Components/ItemCard'
import { connect } from 'react-redux'

const RegFlavors = props => {

    const [pintPrice, setPintPrice] = useState()
    const [gallonPrice, setGallonPrice] = useState()
    // const [task, setTask] = useState(false)
    
    useEffect(() => {
        let task = false
        const getPrice = async () => {
          const prices = await firebase.firestore().collection('FlavorSizes').get()
          if(!task){
            prices.docs.forEach( doc => {
            setPintPrice(doc._data.sizeRegular)
            setGallonPrice(doc._data.sizeBucket)
            })
          }
        }
        getPrice()
        return () => {
            task = true
        }
    },[])

    let index = 0
    
    return (
      <ScrollView 
      contentContainerStyle={styles.container}
      >
        <FlatList
            data={props.cartItems.renderWater}
            keyExtractor={(item, index) => index.toString()}
            numColumns='2'
            // extraData={props.cartItems.renderWater}
            renderItem={({item}) => 
            <ItemCard
                item="Water Ice"
                name={item.flavors.names}
                pic={{uri: item.flavors.image}}
                discription={item.flavors.details || null}
                remove={props.removeItem}
                toCart={props.addItemToCart}
                pintPrice={pintPrice}
                gallonPrice={gallonPrice}
                itemId={index++}
                quantity={1}
                total={pintPrice}
            />
            }
        />
      </ScrollView>
    )
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

// the styling is being handled in the ItemCard file
const styles = StyleSheet.create({
    container: {
      position: 'relative',
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RegFlavors)