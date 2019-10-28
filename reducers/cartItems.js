// let index = 0

const cartItems = (state = [], action)=>{
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, {
                item:action.payload
                // id: index++
            }]
        case 'REMOVE_FROM_CART':
            return state.filter(cartItem => cartItem.item.id !== action.payload.id)
                // console.log(action.payload.id)
            
    }
    return state
}

export default cartItems
