
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
                // console.log(action.payload.id)
    }
    return state
}

export default cartItems
