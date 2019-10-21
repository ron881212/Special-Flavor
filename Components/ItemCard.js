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
            // title={props.name}
            // all images need a fixed size
            image={props.pic}
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
              onPress={ () => {props.toCart(props.name), Added() }} />
        </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '95%',
        height: 'auto'
    },
})

export default ItemCard