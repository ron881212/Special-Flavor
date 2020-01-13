const initialState = []

const renderUsers = (state = initialState, action)=>{
    switch (action.type) {
        case 'ADD_TO_USERS':
            return [...state, {
                users:action.payload
            }]
    }
    return state
}

export default renderUsers