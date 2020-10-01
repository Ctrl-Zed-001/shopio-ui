const initState = {
    allVendors: []
}

const VendorReducer = (state = initState, action) => {
    switch (action.type) {
        case "GETALLVENDORS":
            return {
                ...state,
                allVendors: action.payload
            }
        case "ADDNEWVENDOR":
            let newVendorList = [
                ...state.allVendors,
                action.payload
            ];
            return {
                ...state,
                allVendors: newVendorList
            }
        default: return state
    }
}

export default VendorReducer