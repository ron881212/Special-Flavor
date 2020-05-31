import React, { useState, useEffect, useContext } from 'react'
import { 
    Text, 
    View, 
    StyleSheet, 
    Dimensions, 
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Card, ListItem, Button, Icon, Image } from 'react-native-elements'
import heartOne from '../images/purple_heart.png'
import heartTwo from '../images/purple_heart_2.png'

const ItemCard = props => {
    const [newIcon, setIcon] = useState(false)
    const [cartTitle, setCartTitle] = useState(false)
    const [fav, setFav] = useState(false)

    const Added = () => {
        setIcon(!newIcon)
        setCartTitle(!cartTitle)  
    }

    const favorite = () => {
        setFav(!fav)
    }

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
            titleStyle={styles.title}
            image={props.pic}
            imageWrapperStyle={styles.image}
            containerStyle={styles.card}
            imageProps={{PlaceholderContent:<ActivityIndicator />}}
            >
            <Text style={{marginBottom: 10, textAlign: 'left', fontSize: 12}}>
                {props.name + '\n' + `$${props.pintPrice}.00`}
            </Text>
            <TouchableOpacity onPress={()=>favorite()}>
            <Image
              source={ !fav ? heartOne : heartTwo }
              style={{ width: 35, height: 35 }}
              PlaceholderContent={<ActivityIndicator />}
            />
            </TouchableOpacity>
        </Card>
            <Button
              icon={
                <Icon 
                name='shopping-bag'
                color='#ffffff' 
                type='feather'
                />
              }
              backgroundColor='#03A9F4'
              buttonStyle={{
                borderRadius: 50, 
                width: 60,
                height: 60,
                right: 30,
                bottom: 30 //30
              }}
              containerStyle={{
                borderRadius: 50, 
                width: 70,
                height: 70,
                left: cardWidth / 1.3,
                bottom: '15%', // 12%
                borderColor: '#dddddd',
                borderWidth: 40,
                marginBottom: -40 //-30
              }}
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
        </View>
    )
}

const mapStoreToProps = (store) => {
    return {
        store: store
    }
}

const cardWidth = Dimensions.get('window').width / 2.4

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: cardWidth,
        borderRadius: 25,
        borderWidth: 0,
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0, //default is 1
        shadowRadius: 0,
        // marginBottom: -10
    },
    title: {
        display: 'flex',
        fontSize: 13,
        justifyContent: 'center',
    },
    image: {
        display: 'flex',
        justifyContent: 'center',
        width: cardWidth,
        borderRadius: 25,
        overflow: 'hidden'
    }
})

export default connect(mapStoreToProps)(ItemCard)
