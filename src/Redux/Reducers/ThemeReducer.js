const initState = {
    sidenav: true
}

export default function ThemeReducer(state = initState, action) {
    switch (action.type) {
        case "TOGGLESIDENAV":
            return {
                ...state,
                sidenav: !state.sidenav
            }
        default: return state
    }
}