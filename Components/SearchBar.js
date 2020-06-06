import React from 'react'
import { 
    Text, 
    View, 
    SafeAreaView, 
    StyleSheet, 
    ScrollView,
    Alert
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'

class Search extends React.Component {
  state = {
    search: '',
    flavorData: null,
    snackData: null,
    mounted: true
  }

  updateSearch = search => {    
    const { mounted } = this.state

    // acts like componetdidmount
    mounted ? this.refillData()
    : null

    // runs search through filter and sets mount to false
    const newSearch = search.trim()
    this.setState({ search: newSearch })
    this.props.searchWaterIce(search)
    this.props.searchSnacks(search)
    this.setState({mounted: false})

    // if empty this runs the clearSearch function
    if(search === '') this.clearSearch()
  }

  clearSearch = () => {
    const { flavorData, snackData } = this.state

    // empty redux states
    this.props.emptyWaterList()
    this.props.emptySnackList()
    
    // add all items back to redux
    this.props.refillWaterList(flavorData)
    this.props.refillSnackList(snackData)
  }
  
  refillData = () => {
    this.setState({ flavorData: this.props.cartItems.renderWater })
    this.setState({ snackData: this.props.cartItems.renderSnacks })
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
        // onClear={this.clearSearch}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchWaterIce: (search) => dispatch({type: 'SEARCH_WATER_ICE', payload: search}),
  searchSnacks: (search) => dispatch({type: 'SEARCH_SNACKS', payload: search}),
  emptyWaterList: () => dispatch({type: 'EMPTY_WATER_ICE'}),
  emptySnackList: () => dispatch({type: 'EMPTY_SNACKS'}),
  refillWaterList: (list) => dispatch({type: 'REFILL_WATER_ICE', payload: list}),
  refillSnackList: (list) => dispatch({type: 'REFILL_SNACKS', payload: list})
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
