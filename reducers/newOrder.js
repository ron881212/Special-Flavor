// I changed state to an array from a object
const newOrder = (state = [], action)=>{
    switch (action.type) {
        case 'SEND_ORDER':
                state.total -= action.payload
                // console.tron.log('REMOVE_TO_TOTAL' + state.total)
                return {
                    total: state.total
                }
    }
    return state
}

export default newOrder

// Sudo order format
// Hey sis lemme get
// { Loop order
// "{Quantity} {Pint : Gallon} of {Flavor} {WaterIce : null}"
// }
// __________
// {total}