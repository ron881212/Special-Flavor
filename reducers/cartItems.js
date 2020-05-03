
const cartItems = (state = [], action)=>{
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, {
                item:action.payload
            }]
        case 'REMOVE_FROM_CART':
            return state.filter(cartItem => cartItem.item.id !== action.payload.id)
                // console.log(action.payload.id)
    
        case 'ADD_TOTAL_TO_CART':
            return state.filter((cartItem, id) => {
                if(cartItem.item.id == action.payload.id){
                    return action.payload.price = id
                }
            // try putting return before state.filter
            })
        case 'UPDATE_QUANTITY':
            return state.filter((value) => {
                if(value.item.id == action.payload){
                    value.item.quantity = action.count
                }
                return value
            })
        case 'UPDATE_INDEX':
            return state.filter((value) => {
                if(value.item.id == action.payload){
                    value.item.selectedIndex = action.count
                }
                return value
            })
        case 'PRODUCT_TOTAL':
            return state.filter((value) => {
                if(value.item.id == action.payload){
                    value.item.total = action.total
                }
                return value
            })
    }
    return state
}

export default cartItems
