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

const ItemCard = props => {
    return(
        <Card
            key={props.index}
            title='Black Berry'
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
    )
}

export default ItemCard