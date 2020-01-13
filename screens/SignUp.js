import React from 'react'
import {
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  Alert
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
        setUserName: null,
        setEmail: null,
        setPassword: null,
        confirmPassword: null,
      }
    }
    //add sendEmailVerification(ActionCodeSettings actionCodeSettings)
    userSignUp = () => {
      const { setEmail, setPassword, confirmPassword, setUserName } = this.state  
      if(setPassword === confirmPassword){
        firebase.auth().createUserWithEmailAndPassword(setEmail, setPassword)
        .then(success => {
          if(success){
            email = firebase.auth().currentUser.email
            userID = firebase.auth().currentUser.uid
            this.userInfo = firebase.firestore().collection('Users').doc(userID)
            firebase.firestore().runTransaction(async transaction => {
                const doc = await transaction.get(this.userInfo);
                if (!doc.exists) {
                  transaction.set(this.userInfo, { userName: setUserName })
                }
            })
          }
        })
      }
      else if(setPassword !== confirmPassword){
        Alert.alert('Confirm password doesn\'t match')
      }
    }

    render(){
      return(
        <SafeAreaView>
          <ImageBackground
            source={require('../images/splash.jpeg')} 
            style={{width: '100%', height: '100%'}}
            imageStyle={{opacity: 0.7}}>
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
              <Input
                placeholder='User Name'
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
          </KeyboardAvoidingView>
          </ImageBackground>
        </SafeAreaView>
      )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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