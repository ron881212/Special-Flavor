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
            image={{uri: 'https://s3-media2.fl.yelpcdn.com/bphoto/3EhE7hJvrOTjH7Wi-H0iyA/o.jpg'}}>
            <Text style={{marginBottom: 10}}>
                You see me drinking alkene
                By any means I gave you a design
                I even titled it I put it on my part of the shine
                Keep shit going every morning I try
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