const initialState = []

const renderWater = (state = initialState, action)=>{
    switch (action.type) {
        case 'ADD_TO_WATER_ICE':
            return [...state, {
                flavors:action.payload
            }]
    }
    return state
}

export default renderWater