const CategoryReducer = (state, action) => {
    switch(action.type){
        case 'GET_CATEGORY':
            return{
                ...state,
                categories: action.payload,
                loading: false
            }
        case 'SET_LOADING':
            return{
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default CategoryReducer;