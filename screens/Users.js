import React from 'react' 
import { View, 
  Text, 
  StyleSheet, 
  TextInput, 
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native' 
import firebase from 'react-native-firebase' 
import { Card, Avatar, ListItem, Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

class Users extends React.Component {
    constructor(){
        super()
        this.state = {
            name: null,
            email: null,
            phone: null,
            address: null,
            avatar: null,
            list: []
        }
        const email = firebase.auth().currentUser.email  
        const userID = firebase.auth().currentUser.uid
        this.ref = firebase.firestore().collection('Users').doc(userID)
    }
    static navigationOptions =  {
      title: 'Users'
    }
    // get email and password screen must have a way to change the password 
    // and a way to recover the password
    componentDidMount() {
      //grab all user names pics and set it to a state array to map over

    }

    render() {   

      return (
        <SafeAreaView style={styles.container}>
        {/* Use own profilePic in database */}
            <Avatar
              rounded
              size='xlarge'
              source={{uri: this.state.avatar}}
              containerStyle={styles.avatar}
            />
            <ScrollView>
              <Card containerStyle={styles.cards}>
              {/* ALL USERS WILL BE MAPPED HERE */}
                {
                  list.map((l, i) => (
                    <TouchableOpacity
                    // this will navigate to the same screen but the chat will change to 
                    // whoever we clicked on.
                    onPress={()=>this.props.navigation.navigate('ScreenGoesHere')}
                    >
                    <ListItem
                      key={i}
                      leftAvatar={{ source: { uri: l.avatar_url } }}
                      title={l.name}
                      subtitle={l.subtitle}
                      bottomDivider
                    />
                    </TouchableOpacity>
                  ))
                }
              </Card>
            </ScrollView>
        </SafeAreaView>
      )
    }
}

const sectionWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#e8e8e8',
    },
    avatar: {
      margin:20
    },
    cards: {
      display: 'flex',
      flexDirection: 'column',
      height: 80,
      margin:10,
      borderRadius: 5,
      borderColor: 'white',
      width: sectionWidth / 1.1,
      shadowColor: 'rgba(0,0,0, .2)',
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0, //default is 1
      shadowRadius: 0
    },
})

// this will navigate to a screen that will house gifted chat.
export default withNavigation(Users)