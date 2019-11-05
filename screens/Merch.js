import React, {useState} from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Dimensions } from 'react-native'
import Banner from '../Components/Banner'
import Shop from '../Components/Shop'
import MyAvatar from '../Components/Avatar'
import Clothes from '../WaterIce/Clothes'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

const MerchScreen = props => {
  const [message, setMessage] = useState("")
  // const [cartTitle, setCartTitle] = useState(false)
  const handleSubmit = () => {
    const currentText = textRef.current; // Read it from the ref
    alert(currentText);

  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <Banner style={styles.banner} /> */}
      {/* <MyAvatar /> */}
      <Image
        source={require('../images/SpecialFlavorsLogo.png')} 
        style={styles.backgroundStyle}
      >
      </Image>
      <View style={styles.input}>
      <Input 
      placeholder='Type a message'
      // style={styles.input}
      onChangeText={(text) => setMessage(text)}
      />
      <Button 
        title=" Send"
        type="solid"
        onPress={()=> console.log(message)}
        // buttonStyle={styles.input}
        icon={
        <Icon
          name="send"
          size={20}
          color="white"
        />
      }
        iconLeft
      />
      </View>
    </SafeAreaView>
  )
}
const sectionWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  banner:{
    opacity: 0.1
    
  },
  input:{
    display: 'flex',
    flexDirection: 'row',
    width: sectionWidth / 1.5,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundStyle:{
    flex: 1,
    backgroundColor:'purple',
    // opacity: 0.8,
    position: 'relative',
    alignItems: 'center',
  }
})

export default MerchScreen