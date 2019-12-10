import React, { Component } from 'react'
import { 
    SafeAreaView, 
    View,
    StyleSheet, 
    ImageBackground,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';

const Banner = props => {
    return (
        // <View style={styles.banner}>
        <Image
        source={require('../images/SpecialFlavorsBanner3.png')} 
        style={styles.backgroundStyle}
        />
        // </Image>
        // </View>
    )
}
// create stylesheet here.
// banner needs to be absolute and start at the top with a fixed height and width

const sectionWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    banner: {
        flex: 1,
    },
    backgroundStyle: {
        backgroundColor:'purple',
        width: sectionWidth,
        resizeMode: 'contain',
        margin:0,
        padding:0
        
    }
})

export default Banner