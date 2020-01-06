// I changed state to an array from a object
const cartTotal = (state = [], action)=>{
    switch (action.type) {
        case 'ADD_TO_TOTAL':
            return {
                total: action.payload
                // console.log(action.payload.total)
            }
        case 'REMOVE_TO_TOTAL':
                state.total -= action.payload
                console.log('REMOVE_TO_TOTAL' + state.total)
                return {
                    total: state.total
                }
        case 'UPDATE_TOTAL':
                state.total += action.payload
                console.log('UPDATE_TOTAL' + state.total)
                return {
                    total: state.total
                }
    }
    return state
}

export default cartTotal