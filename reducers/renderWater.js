const initialState = []

const renderWater = (state = initialState, action)=>{
    switch (action.type) {
        case 'ADD_TO_WATER_ICE':
            return [...state, {
                flavors:action.payload
            }]
        case 'SEARCH_WATER_ICE':
            return searched = state.filter( (value) => {
                console.log('this is the value', action.payload);
                if(value.flavors.names.indexOf(action.payload) > -1){
                    return value.flavors.names.indexOf(action.payload) > -1
                }
                // return value
            })
    }
    return state
}

export default renderWater