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

const RegFlavors = props => {
    
    const [flavors, setFlavors] = useState([])
    const [newFlavors, setNewFlavors] = useState([])

    useEffect(() => {
        start()
    }, [])

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

    return (
      <ScrollView contentContainerStyle={styles.container}>
        { newFlavors.map((flavor, i) => (
        <Card
            key={i}
            title='BlackBerry'
            image={{uri: 'https://www.seriouseats.com/2018/05/20180529-blackberry-ice-cream-vicky-wasik-17-1500x1125.jpg'}}>
            <Text style={{marginBottom: 10}}>
                I'm African-American, I'm African
                I'm black as the heart of a fuckin' Aryan
                I'm black as the name of Tyrone and Dareous
            </Text>
            <Button
              icon={<Icon 
                name='shopping-cart' 
                color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{
                  borderRadius: 0, 
                  marginLeft: 0, 
                  marginRight: 0, 
                  marginBottom: 0}}
              title=' Add to Shopping Cart' />
        </Card>
        ))}
      </ScrollView> 
    )
}

const styles = StyleSheet.create({
    container: {
      position: 'relative',
      padding: 0
    }
})

export default RegFlavors;