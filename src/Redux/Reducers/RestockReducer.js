const initState = {
    allRestocks: []
}

const RestockReducer = (state = initState, action) => {
    switch (action.type) {
        case "GETALLRESTOCK":
            return {
                ...state,
                allRestocks: action.payload
            }
        case "ADDNEWRESTOCK":
            let all = state.allRestocks;
            all = [
                ...all,
                action.payload
            ]
            return {
                ...state,
                allRestocks: all
            }
        case "UPDATERESTOCK":
            let allrst = state.allRestocks;
            let index = action.payload.restockindex;
            allrst[index] = action.payload.data;
            allrst[index].recievedP = action.payload.recievedP
            allrst[index].canceledP = action.payload.canceledP
            allrst[index].returnedP = action.payload.returnedP
            return {
                ...state,
                allRestocks: [
                    ...allrst
                ]
            }
        default:
            return state
    }
}
export default RestockReducer