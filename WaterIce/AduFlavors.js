import React, { Component } from 'react'
import { 
    Text, 
    View, 
    SafeAreaView, 
    StyleSheet, 
    ScrollView 
} from 'react-native'
import { Card, ListItem, Button, Icon, Image } from 'react-native-elements'

const AduFlavors = props => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Card
            title='Blue Print'
            image={{uri: 'https://forgottencocktails.com/wp-content/uploads/sites/2/2018/01/rosemaryblue.jpg'}}>
            <Text style={{marginBottom: 10}}>
                Would be text from the database
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
      </ScrollView>
    )   
}

const styles = StyleSheet.create({
    container: {
      position: 'relative',
      padding: 0
    }
})

export default AduFlavors