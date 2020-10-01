const initState = {
    allUsers: []
}

const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case "GETALLUSERS":
            return {
                ...state,
                allUsers: action.payload
            }
        case "ADDNEWUSER":
            let allusers = state.allUsers;
            allusers = [
                ...allusers,
                action.payload
            ]
            return {
                ...state,
                allUsers: allusers
            }
        default:
            return state
    }
}
export default UserReducer