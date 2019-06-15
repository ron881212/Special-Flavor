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
import { 
  createAppContainer,
  createStackNavigator
} from 'react-navigation'
import firebase from 'react-native-firebase'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import SignUpScreen from './SignUp'

// this file should also have 'sign up' screen and bottom tab 
class LogInScreen extends React.Component {
static navigationOptions = {
  title: 'Log In',
}
  constructor(){
    super()
    this.state = {
      email: null,
      password: null
    }
  }

  
  
  render() {
    // const createUser = firebase.auth.createUserWithEmailAndPassword() 
    // createUser(this.state.email, this.state.password)
    return (
      <SafeAreaView>
      <ImageBackground
      source={require('../images/SpecialFlavorsLogo.png')} 
      style={{width: '100%', height: '100%', backgroundColor:'black'}}
      imageStyle={{opacity: 0.7}}
      >  
      <View style={styles.container}>
        <Input
          placeholder='Email'
          inputContainerStyle={styles.form}
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
          inputContainerStyle={styles.form}
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
          onPress={()=>this.props.navigation.navigate('SignUp')}
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
    justifyContent: 'flex-end',
    marginBottom: 60
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

export default createAppContainer(
  createStackNavigator({
    LogIn: { 
      screen: LogInScreen 
    },
    SignUp: { 
      screen: SignUpScreen
     }
  })
)