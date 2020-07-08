import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Login from './Login' 
import firebase from 'react-native-firebase' 
import { Avatar, Card, ListItem } from 'react-native-elements';
import Splash from '../images/splashImg.jpg'
import BottomNav from '../Components/BottomTab'

class Verification extends React.Component {
    static navigationOptions = {
      title: 'Verification',
    };
    constructor() {
        super() 
        this.state = {
          user: null,
          verification: false,
        } 
    } 
    componentDidMount() {
        if(!firebase.auth().currentUser.emailVerified && !firebase.auth().currentUser.isAnonymous){
            Alert.alert("Go to your email and click on the verification link before logging in")
        }
    }
    componentWillUnmount() {
        if (this.unsubscriber) {
          this.unsubscriber() 
        }
    }
    logIn(){
        firebase.auth().currentUser.reload()
        .then(check => {
            if(firebase.auth().currentUser.emailVerified){
                console.tron.log("We have verification")
                this.setState({ verification: true })  
            }
        })
    }
    render() {
      if (this.state.verification) {
          return <BottomNav /> 
        }
        return (
            <View style={styles.container}>
                <Avatar
                  rounded
                  size='xlarge'
                  source={ Splash }
                  renderPlaceholderContent={<ActivityIndicator />}
                />
                <TouchableOpacity
                    onPress={()=>this.logIn()}>
                    <Card containerStyle={styles.cards}>
                      <ListItem
                        chevron
                        containerStyle={{margin:0}}
                        title='Log-in Here'
                        badge={{ 
                          value: 'Log-in', 
                          textStyle: { color: 'white', fontSize:15 },
                          badgeStyle: {backgroundColor:'purple', height:25, width:50 }
                        }}
                      />
                    </Card>
                </TouchableOpacity>
            </View>
        )
    }
}

const sectionWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    //   marginBottom: 60
    },
    cards: {
        display: 'flex',
        flexDirection: 'column',
        height: 80,
        margin:10,
        borderRadius: 5,
        // borderColor: 'white',
        width: sectionWidth / 1.1,
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0, //default is 1
        shadowRadius: 0
      }
})

export default Verification