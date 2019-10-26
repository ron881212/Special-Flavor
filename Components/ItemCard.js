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
import { Card, ListItem, Button, Icon, Image } from 'react-native-elements'

const ItemCard = props => {
    const [newIcon, setIcon] = useState(false)
    const [cartTitle, setCartTitle] = useState(false)

    const Added = () => {
        setIcon(!newIcon)
        setCartTitle(!cartTitle)
        
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
              // all buttons need a fixed size
              buttonStyle={{
                borderRadius: 0, 
                marginLeft: 0, 
                marginRight: 0, 
                marginBottom: 0}}
              title={(cartTitle === false) ? ' Add To Cart' : ' Added!' }
              // onpress replace props.name with an object that contains all waterIce info
              onPress={ !cartTitle ?
                () => {props.toCart(props.name, props.item, props.pic), Added()}
                :
                () => {props.remove(props.name, props.item, props.pic), Added()}
              }
            />
        </Card>
        </View>
    )
}

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

export default ItemCard