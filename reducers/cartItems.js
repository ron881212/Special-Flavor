// const initialState = [
//     {item: null},
//     {total: null}
// ]

const cartItems = (state = [], action)=>{
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, {
                item:action.payload
            }]
        case 'REMOVE_FROM_CART':
            return state.filter(cartItem => cartItem.item.id !== action.payload.id)
                // console.log(action.payload.id)
        case 'ADD_TO_TOTAL':
            // let grandTotal = {total:action.payload}
            // return [...state, state.total = action.payload]
                return state.push({total:action.payload})

                // console.log(action.payload)
            
        case 'REMOVE_TO_TOTAL':
            return [{
                total: action.total -= action.total
            }] 
    }
    return state
}

export default cartItems
