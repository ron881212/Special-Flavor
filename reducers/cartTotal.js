let initialState = {
    total: 0
}

const cartTotal = (state = initialState, action)=>{
    switch (action.type) {
        case 'ADD_TO_TOTAL':
            return {
                total: action.payload += state.total
                // console.log(action.payload.total)
            } 
        case 'REMOVE_TO_TOTAL':
            return {
                total: state.total -= action.payload
            }
    }
    return state
}

export default cartTotal
