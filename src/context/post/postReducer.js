const PostReducer = (state={posts: []}, action) => {
    switch(action.type){
        case "CREATE_POST":
        case "UPDATE_POST":
        case "DELETE_POST":
            return {
                ...state,
                posts: action.payload,
                createSuccess: true,
                loading: false
            }
        case "GET_POSTS":
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case "LIKE_POST":
        case "DIS_LIKE_POST":
            return {
                ...state,
                posts: action.payload,
            }
        case "ADD_BOOKMARK":
        case "REMOVE_BOOKMARK":
        case "ALL_BOOKMARKS":
            return {
                ...state,
                bookmarks: action.payload,
            }
        case 'POST_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'POST_LOADING_RESET':
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default PostReducer;