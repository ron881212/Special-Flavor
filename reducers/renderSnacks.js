const initialState = []

const renderSnacks = (state = initialState, action)=>{
    switch (action.type) {
        case 'ADD_TO_SNACKS':
            return [...state, {
                snacks:action.payload
            }]
    }
    return state
}

export default renderSnacks

