const initialState = []

const renderUsers = (state = initialState, action)=>{
    switch (action.type) {
        case 'ADD_TO_USERS':
            return [...state, {
                users:action.payload
            }]
        case 'UPDATE_COUNT':
            console.log(action.count);
            let update = state
            return update.filter( (value) => {
                // console.log('this is the value', action.payload)
                if(value.users.uid == action.payload){
                    value.users.count = action.count
                }
                return value
            })
        case 'UPDATE_USERS':
            // right here add new logic for updating the users use state.push()
    }

    return state
}

export default renderUsers