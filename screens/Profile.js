import React from 'react' 
import { View, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native' 
import firebase from 'react-native-firebase' 
import { Button, Input } from 'react-native-elements'
import Banner from '../Components/Banner'

class Profile extends React.Component {
  constructor(){
    super()
    this.state = {
      address: null,
      order: null
    }
  }

  logOut(){
    firebase.auth().signOut()
  }

  data = () => {
    const { address, order } = this.state
    // use context to maintain doc name to keep user info seperate
    this.userInfo = firebase.firestore().collection('userInfo').doc('My Unique Name')
      firebase.firestore().runTransaction(async transaction => {
          const doc = await transaction.get(this.userInfo);
          // if it does not exist set the population to one
          if (doc.exists) {
            transaction.update(this.userInfo, { adresses: address, orders: order })
          }
      })
  }
    render() {
      return (
        <SafeAreaView style={styles.container}>
            <Input
            placeholder='address'
            onChangeText={(text) => this.setState({address:text})}
            />
            <Input
            placeholder='order'
            onChangeText={(text) => this.setState({order:text})}
            />
          <Button 
            onPress={()=>this.data()}
            title='database'
            />
          <Button 
            onPress={()=>this.logOut()}
            title='log out'
            />
        </SafeAreaView>
      )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
})

export default Profile;