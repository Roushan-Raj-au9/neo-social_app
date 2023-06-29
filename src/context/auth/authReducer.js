const AuthReducer = (state, action) => {
    switch(action.type){
        case 'REGISTER':
        case 'LOGIN':
            return{
                ...state,
                loginUser: action.payload,
                loading: false
            }
        case 'RESET_AUTH':
            return{
                ...state,
                loginUser: {},
                loading: false
            }
        case 'USERS':
            return{
                ...state,
                users: action.payload
            }
        case 'FOLLOW_USER':
        case 'UNFOLLOW_USER':
            return{
                ...state,
                followUser: action.payload
            }
        case 'GET_PROFILE':
        case 'UPDATE_PROFILE':
            return{
                ...state,
                profile: action.payload
            }
        case 'USER_LOADING':
            return {
                ...state,
                loading: true
            }

        default:
            return state
    }
}

export default AuthReducer;