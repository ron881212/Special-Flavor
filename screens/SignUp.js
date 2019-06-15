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
      this.state = {
        setEmail: null,
        setPassword: null,
        setUserName: null,
        setAddress: null,
        setPhone: null
      }
    }
  
    render(){
  
      return(
        <SafeAreaView>
          <ImageBackground
            source={require('../images/splash.jpeg')} 
            style={{width: '100%', height: '100%'}}
            imageStyle={{opacity: 0.7}}>
            <View style={styles.container}>
              <Input
                placeholder='User Name'
                inputContainerStyle={styles.form2}
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
                inputContainerStyle={styles.form2}
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
                inputContainerStyle={styles.form2}
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
                inputContainerStyle={styles.form2}
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

export default withNavigation(SignUpScreen)