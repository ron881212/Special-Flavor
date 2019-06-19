import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, ImageBackground } from 'react-native';

const Banner = props => {
    return (
        <View style={{height:'40%', width:'100%', flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <ImageBackground
        source={require('../images/SpecialFlavorsLogo.png')} 
        style={{width: '100%', height: '25%', backgroundColor:'purple'}}
        imageStyle={{height: '100%'}}
        >
        {/* <Text>
            Here
        </Text> */}
        </ImageBackground>
        </View>

    )
}
// create stylesheet here.
// banner needs to be absolute and start at the top with a fixed height and width

export default Banner