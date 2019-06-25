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
        flex: 1,
        width: '100%'
    },
    backgroundStyle: {
        flex: 1,
        backgroundColor:'purple'
    }
})

export default Banner