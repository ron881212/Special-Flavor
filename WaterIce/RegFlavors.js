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

    const [flavors, setFlavors] = useState([])
    const [pintPrice, setPintPrice] = useState()
    const [gallonPrice, setGallonPrice] = useState()
    // const [regSearchFlavors, setRegSearchFlavors] = useState([])
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
        start()
    },[])

    const start = async () => {
        const getFlavors = await firebase.firestore().collection('Flavors').get()
        const prices = await firebase.firestore().collection('FlavorSizes').get()
        
        getFlavors.docs.forEach( doc => {
            // setFlavors([...flavors, flavors.push({
            //     names: doc.id,
            //     image: doc._data.image,
            //     details: doc._data.description,
            // })])
            props.addToWaterIce(
                {
                  names: doc.id,
                  image: doc._data.image,
                  details: doc._data.description,
                }
            )
        })

        
        prices.docs.forEach( doc => {
            setPintPrice(doc._data.sizeRegular)
            setGallonPrice(doc._data.sizeBucket)
            // console.log(doc._data.sizeBucket)
        })
        
        
        // console.log('====================================')
        // // console.log(props.cartItems)
        // console.log('redux flavors', props.cartItems)
        // console.log('====================================')
        setCompleted(!completed)
    }

    let index = 0
    
    return (
      <ScrollView 
      contentContainerStyle={styles.container}
      >
        {/* import itemCard to Searchbar put searched items into a card;
            searchFlavors ? newFlatlist : original Flatlist; // okay
            grab searchbar component use props for onchangetext and vaule;
            move state and updateSearch to this component;

        */}
        <FlatList
            data={props.cartItems.renderWater}
            keyExtractor={(item, index) => index.toString()}
            numColumns='2'
            // extraData={props.cartItems.renderList}
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
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(RegFlavors)