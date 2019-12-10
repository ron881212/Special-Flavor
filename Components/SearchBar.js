import React from 'react'
import { 
    Text, 
    View, 
    SafeAreaView, 
    StyleSheet, 
    ScrollView 
} from 'react-native'
import { SearchBar } from 'react-native-elements'

export default class Search extends React.Component {
  state = {
    search: '',
  }

  updateSearch = search => {
    const newSearch = search.toLowerCase()
    this.setState({ search: newSearch })
    console.log(newSearch)
  }

  render() {
    const { search } = this.state

    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
        containerStyle={styles.bar}
        inputContainerStyle={styles.search}
        inputStyle={styles.text}
        lightTheme = {true}
      />
    )
  }
}

const styles = StyleSheet.create({
    bar: {
        width: 350,
        borderRadius: 50, 
        padding: 0,
        margin:0
    },
    search: {
        borderRadius: 50, 
        
    },
    text: {
        color: 'black', 
        // lightTheme: true
    }
})