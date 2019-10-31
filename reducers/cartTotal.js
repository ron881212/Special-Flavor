
const cartTotal = (state = [], action)=>{
    switch (action.type) {
        case 'ADD_TO_TOTAL':
            return [{
                total: action.total += action.payload.total
                // console.log(action.payload.total)
            }] 
        case 'REMOVE_TO_TOTAL':
            return [{
                total: action.total -= action.total
            }] 
    }
    return state
}

export default cartTotal