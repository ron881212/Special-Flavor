import React, { Component } from 'react'
import { 
    SafeAreaView, 
    View,
    StyleSheet, 
    ImageBackground,
    ScrollView
} from 'react-native';

const Banner = props => {
    return (
        <View style={styles.banner}>
        <ImageBackground
        source={require('../images/SpecialFlavorsLogo.png')} 
        style={styles.backgroundStyle}
        imageStyle={{height: '100%'}}
        >
        </ImageBackground>
        </View>
    )
}
// create stylesheet here.
// banner needs to be absolute and start at the top with a fixed height and width
const styles = StyleSheet.create({
    banner: {
        width: '100%',
        flex: 1
    },
    backgroundStyle: {
        position: 'absolute',
        top: 0,
        width: '100%', 
        height: '25%', 
        backgroundColor:'purple'
    }
})

export default Banner