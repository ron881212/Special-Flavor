import React, { useState, useEffect, useContext } from 'react'
import { 
    Text, 
    View, 
    SafeAreaView, 
    StyleSheet, 
    ScrollView,
    Dimensions
} from 'react-native'
import firebase from 'react-native-firebase' 
import { connect } from 'react-redux'
import { Card, ListItem, Button, Icon, Image } from 'react-native-elements'

const ItemCard = props => {
    const [newIcon, setIcon] = useState(false)
    const [cartTitle, setCartTitle] = useState(false)

    const Added = () => {
        setIcon(!newIcon)
        setCartTitle(!cartTitle)  
    }

    // let index = 0

    let allCartItems = {
        name: props.name,
        item: props.item,
        pic: props.pic,
        id: props.itemId,
        quantity: props.quantity,
        pintPrice: props.pintPrice,
        gallonPrice: props.gallonPrice,
        total: props.total,
        selectedIndex: 0
    }

    return(
        <View>
        <Card
            // title name font needs to be smaller
            title={props.name}
            titleStyle={styles.title}
            // all images need a fixed size
            image={props.pic}
            imageWrapperStyle={styles.image}
            containerStyle={styles.card}
            >
            <Text style={{marginBottom: 10, textAlign: 'center', fontSize: 12}}>
                {props.discription}
            </Text>
            <Button
              icon={<Icon 
                name={(newIcon === false) ? 'shopping-bag' : 'check-square'} 
                color='#ffffff' 
                type='feather'/>}
              backgroundColor='#03A9F4'
              buttonStyle={{
                borderRadius: 0, 
                marginLeft: 0, 
                marginRight: 0, 
                marginBottom: 0}}
              title={(cartTitle === false) ? ' Add To Cart' : ' Added!' }
              // onpress replace props.name with an object that contains all waterIce info
              onPress={ !cartTitle ?
                () => {
                    props.toCart(allCartItems), 
                    console.log(allCartItems)
                    console.log(props.store.cartItems)
                    Added()
                }
                :
                () => {
                    props.remove(allCartItems), 
                    console.log(props.store.cartItems)
                    Added()
                }
              }
            />
        </Card>
        </View>
    )
}

const mapStoreToProps = (store) => {
    return {
        store: store
    }
}

// const mapDispatchToProps = (dispatch) => ({
//     addItemToCart:(product) => dispatch({type:'ADD_TO_CART',
//     payload:product}),
//     removeItem: (product) => dispatch({type: 'REMOVE_FROM_CART',       payload: product}),
//     addToTotal: (price) => dispatch({type: 'ADD_TO_TOTAL', payload: price}),
//     subFromTotal: (price) => dispatch({type: 'REMOVE_TO_TOTAL', payload: price})
// })

const cardWidth = Dimensions.get('window').width / 2.4

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: cardWidth,
        // height: 'auto'
    },
    title: {
        display: 'flex',
        fontSize: 13,
        justifyContent: 'center',
    },
    image: {
        display: 'flex',
        justifyContent: 'center',
    }
})

export default connect(mapStoreToProps)(ItemCard)
