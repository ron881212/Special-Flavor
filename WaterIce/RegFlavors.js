import React, { useState, useEffect } from 'react'
import { 
    Text, 
    View, 
    SafeAreaView, 
    StyleSheet, 
    ScrollView 
} from 'react-native'
import firebase from 'react-native-firebase' 
import { Card, ListItem, Button, Icon, Image } from 'react-native-elements'
import ItemCard from '../Components/ItemCard'

const RegFlavors = props => {
    
    const [flavors, setFlavors] = useState([])
    const [newFlavors, setNewFlavors] = useState([])

    useEffect(() => {
        start()
    }, [ShowFlavors])

    const start = async () => {
        const getFlavors = await firebase.firestore().collection('Flavors').get()
        getFlavors.docs.forEach( doc => {
            setFlavors(flavors.push(doc.id))
            setNewFlavors(newFlavors.concat([flavors]))
        })
        console.log('====================================')
        console.log(flavors)
        console.log('====================================')
    }

    const ShowFlavors = newFlavors.map((flavor, i) => 
        <ItemCard 
        // title={flavor}
        index={i}
        />
    )

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {ShowFlavors}
      </ScrollView> 
    )
}

const styles = StyleSheet.create({
    container: {
      position: 'relative',
      padding: 0
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'whitesmoke'
    },
})

export default RegFlavors;