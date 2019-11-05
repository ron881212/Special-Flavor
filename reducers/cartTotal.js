
const cartTotal = (state = {}, action)=>{
    switch (action.type) {
        case 'ADD_TO_TOTAL':
            return {
                total: action.payload
                // console.log(action.payload.total)
            }
        case 'REMOVE_TO_TOTAL':
            return state.filter(cartItem => cartItem.total.id !== action.payload.id)
    }
    return state
}

export default cartTotal
