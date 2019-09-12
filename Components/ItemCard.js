import React, { useState, useEffect, useContext } from 'react'
import { 
    Text, 
    View, 
    SafeAreaView, 
    StyleSheet, 
    ScrollView 
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
            title={props.name}
            image={props.pic}
            containerStyle={styles.card}
            >
            <Text style={{marginBottom: 10, textAlign: 'center'}}>
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
              onPress={Added} />
        </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 350
    },
})

export default ItemCard