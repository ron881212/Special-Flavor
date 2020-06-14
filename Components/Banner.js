import React, { Component } from 'react'
import { 
    View,
    StyleSheet, 
    Image,
    Dimensions
} from 'react-native';
import Shop from './Shop'
import MyAvatar from './Avatar'
import Search from './SearchBar'

const Banner = props => {
    return (
        <View style={styles.banner}>
            <Image
            source={require('../images/SpecialFlavorsBanner3.png')} 
            // style={styles.backgroundStyle}
            />
            <MyAvatar />
            <Shop />

            <View style={styles.bar}>
            <Search />
            </View>

        </View>
    )
}
// create stylesheet here.
// banner needs to be absolute and start at the top with a fixed height and width

const sectionWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    banner: {
        backgroundColor:'purple',
        alignItems: 'center',
        marginBottom: 20
    },
    bar: {
        bottom: '12%',
        position: 'absolute',
      }
})

export default Banner