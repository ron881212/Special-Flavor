import React, { Component } from 'react'
import { 
    SafeAreaView, 
    View,
    StyleSheet, 
    ImageBackground,
    Image,
    ScrollView
} from 'react-native';

const Banner = props => {
    return (
        <View style={styles.banner}>
        <Image
        source={require('../images/SpecialFlavorsLogo.png')} 
        style={styles.backgroundStyle}
        >
        </Image>
        </View>
    )
}
// create stylesheet here.
// banner needs to be absolute and start at the top with a fixed height and width
const styles = StyleSheet.create({
    banner: {
        flex: 1,
    },
    backgroundStyle: {
        flex: 1,
        backgroundColor:'purple',
        position: 'relative',
        alignItems: 'center',
    }
})

export default Banner