const initialState = []

const messageCount = (state = initialState, action)=>{
    switch (action.type) {
        case 'ADD_TO_COUNT':
            return [...state, {
                incoming:action.payload
            }]
        case 'UPDATE_COUNT':
            // stores users received message
    }

    return state
}

export default messageCount