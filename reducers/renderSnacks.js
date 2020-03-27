const initialState = []

const renderSnacks = (state = initialState, action)=>{
    switch (action.type) {
        case 'ADD_TO_SNACKS':
            return [...state, {
                snacks:action.payload
            }]
            case 'SEARCH_SNACKS':
                let searched = state
                return searched.filter( (value) => {
                    console.log('this is the value', action.payload);
                    if(value.snacks.names.indexOf(action.payload) > -1){
                        return value.snacks.names.indexOf(action.payload) >    -1
                    }
                })
            case 'EMPTY_SNACKS':
                return state.length = 0;
            case 'REFILL_SNACKS':
                return state = action.payload
    }
    return state
}

export default renderSnacks

