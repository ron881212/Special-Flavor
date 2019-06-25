import React from 'react'
import {
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from 'react-native'
import firebase from 'react-native-firebase'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import { withNavigation } from 'react-navigation'

class SignUpScreen extends React.Component {
static navigationOptions = {
    title: 'Sign Up',
}
    constructor(){
      super()
    //   this.userInfo = firebase.firestore().collection('userInfo').doc('personal')
      // this needs to be grouped with the user
      // this.userInfo = firebase.firestore().collection('group')
      this.state = {
        setUserName: null,
        setEmail: null,
        setPassword: null,
        confirmPassword: null,
        // setAddress: null,
        // setPhone: null
      }
    }
    //123abc is the password
    userSignUp = () => {
      const { setEmail, setPassword, confirmPassword, setUserName } = this.state  
      if(setPassword === confirmPassword){
        firebase.auth().createUserWithEmailAndPassword(setEmail, setPassword)
        .then(success => {
          if(success){
            email = firebase.auth().currentUser.email
            this.userInfo = firebase.firestore().collection('Users').doc(email)
            firebase.firestore().runTransaction(async transaction => {
                const doc = await transaction.get(this.userInfo);
                // if it does not exist set the population to one
                if (!doc.exists) {
                  transaction.set(this.userInfo, { userName: setUserName })
                  // this is a test feature
                }
            })
          }
        }) 
      }
    }

    render(){
    // const { foo, bar } = this.state
    // const createUser = firebase.auth.createUserWithEmailAndPassword() 
    // createUser(this.state.email, this.state.password)
    // signInWithEmailAndPassword(email, password)
      return(
        <SafeAreaView>
          <ImageBackground
            source={require('../images/splash.jpeg')} 
            style={{width: '100%', height: '100%'}}
            imageStyle={{opacity: 0.7}}>
            <View style={styles.container}>
              <Input
                placeholder='User Name'
                // placeholderTextColor='color'
                inputContainerStyle={styles.form2}
                onChangeText={(text) => this.setState({setUserName:text})}                
                leftIcon={
                  <Icon
                    name='user'
                    size={24}
                    color='black'
                    style={{marginRight:10}}
                  />
                }
              />
              <Input
                placeholder='Email'
                // placeholderTextColor='color'
                keyboardType='email-address'
                autoCapitalize='none'
                inputContainerStyle={styles.form2}
                onChangeText={(text) => this.setState({setEmail:text})}
                leftIcon={
                  <Icon
                    name='mail'
                    size={24}
                    color='black'
                    style={{marginRight:10}}
                  />
                }
              />
              <Input
                placeholder='Password'
                // placeholderTextColor='color'
                autoCapitalize='none'
                secureTextEntry={true}
                inputContainerStyle={styles.form2}
                onChangeText={(text) => this.setState({setPassword:text})}
                leftIcon={
                  <Icon
                    name='lock'
                    size={24}
                    color='black'
                    style={{marginRight:10}}
                  />
                }
              />
              <Input
                placeholder='Confirm Password'
                // placeholderTextColor='color'
                autoCapitalize='none'
                secureTextEntry={true}
                inputContainerStyle={styles.form2}
                onChangeText={(text) => this.setState({confirmPassword:text})}
                leftIcon={
                  <Icon
                    name='lock'
                    size={24}
                    color='black'
                    style={{marginRight:10}}
                  />
                }
              />
            <View style={styles.container2}>
              <Button
              buttonStyle={styles.buttons}
              onPress={()=>this.props.navigation.navigate('LogIn')}
              icon={
              <Icon
                name="log-in"
                size={15}
                color="white"
                style={{marginRight:5}}
              />
              }
              title="Log In"
              />
              <Button
              buttonStyle={styles.buttons}
              onPress={()=>this.userSignUp()}
              icon={
              <Icon
                name="user-plus"
                size={15}
                color="white"
                style={{marginRight:5}}
              />
              }
              title="Sign Up"
              />          
            </View>
        </View>
          </ImageBackground>
        </SafeAreaView>
      )
    }
}

const styles = StyleSheet.create({
    container: {
      //add gradiant and logo as picture above
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    //   marginBottom: 60
    },
    container2: {
      flexDirection: 'row'
    },
    form: {
      borderRadius: 50,
      borderWidth: 1,
      margin: 10,
      height: 50,
      borderColor: '#d6d7da',
      backgroundColor: 'rgba(255, 165, 0, 0.4)'
    },
    form2: {
      borderRadius: 50,
      borderWidth: 1,
      margin: 10,
      height: 50,
      borderColor: '#d6d7da',
      backgroundColor: 'rgba(200, 200, 200,0.7)'
    },
    buttons: {
      borderRadius: 50,
      borderWidth: 1,
      margin: 10,
      height: 50,
      width: 155,
      borderColor: '#d6d7da',
    },
})

export default withNavigation(SignUpScreen)