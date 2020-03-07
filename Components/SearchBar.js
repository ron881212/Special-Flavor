import React from 'react'
import { 
    Text, 
    View, 
    SafeAreaView, 
    StyleSheet, 
    ScrollView 
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'

class Search extends React.Component {
  state = {
    search: '',
  }

  updateSearch = search => {
    const newSearch = search.trim()
    this.setState({ search: newSearch })
    this.props.searchWaterIce(this.state.search)
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

const mapDispatchToProps = (dispatch) => ({
  addToWaterIce: (waterIce) => dispatch({type: 'ADD_TO_WATER_ICE', payload: waterIce}),
  searchWaterIce: (search) => dispatch({type: 'SEARCH_WATER_ICE', payload: search})
})

const mapStateToProps = (state) => {
  return {
      cartItems: state
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)
