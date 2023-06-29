const productReducer = (state, action) => {
    switch(action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case 'GET_PRODUCT':
            return {
                ...state,
                product: action.payload,
                loading: false
            }
        case 'DELETE_CART':
        case 'UPDATE_CART':
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: action.payload,
            }
        case 'GET_CART':
            return {
                ...state,
                cart: action.payload
            }
        case 'RESET_CART':
            return {
                ...state,
                cart: []
            }
        case 'GET_WISHLIST':
        case 'DELETE_WISHLIST':
        case 'ADD_TO_WISHLIST':
            return {
                ...state,
                wishlist: action.payload
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default productReducer