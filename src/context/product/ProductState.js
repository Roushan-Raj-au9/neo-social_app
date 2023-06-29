import { useReducer } from 'react';
import ProductContext from './productContext';
import productReducer from './productReducer';
import axios from 'axios';

const ProductState = ({children}) => {
    const initialState={
        products: [],
        product:{},
        cart:[],
        wishlist:[],
        loading: false
    }
    const [state, dispatch] = useReducer(productReducer, initialState);
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const config = {
        headers:{'Content-Type': 'application/json', authorization: token}
    }
    const getProducts = async () => {
        try {
            setLoading()
            const {data} = await axios.get(`/api/products`);
            dispatch({type: 'GET_PRODUCTS', payload: data.products})
        } 
        catch (error) {
            console.error(error);
        }
    }
    const getCarts = async () => {
        try {
            setLoading()
            const {data} = await axios.get(`/api/user/cart`, config);
            dispatch({type: 'GET_CARTS', payload: data.cart})
        } 
        catch (error) {
            console.error(error);
        }
    }
    const getProduct = async (id) => {
        try {
            setLoading()
            const {data} = await axios.get(`/api/products/${id}`);
            dispatch({type: 'GET_PRODUCT', payload: data.product})
        } 
        catch (error) {
            console.error(error);
        }
    }
    const addToCart = async (id,qty) => {
        try {
            setLoading()
            const {data:{product:item}} = await axios.get(`/api/products/${id}`);
            const product = {
                _id: item._id,
                title: item.title,
                image: item.image,
                price: item.price,
                countInStock: item.quantity,
                quantity: +qty
            }
            const {data} = await axios.post(`/api/user/cart`,{product},config);
            dispatch({type: 'ADD_TO_CART', payload: data.cart, id:id})
        } 
        catch (error) {
            console.error(error);
        }
    }
    const updateCart = async (id,value) => {
        try {
            setLoading()
            const action = {
                type:value
            }
            const {data} = await axios.post(`/api/user/cart/${id}`,{action},config);
            dispatch({type: 'UPDATE_CART', payload: data.cart, id:id})
        } 
        catch (error) {
            console.error(error);
        }
    }
    const deleteItemOfCart = async (id) => {
        try {
            setLoading()
            const {data} = await axios.delete(`/api/user/cart/${id}`,config);
            dispatch({type: 'DELETE_CART', payload: data.cart, id:id})
        } 
        catch (error) {
            console.error(error);
        }
    }
    const addToWhislist = async (id, qty) => {
        try {
            setLoading()
            const {data:{product:item}} = await axios.get(`/api/products/${id}`);
            const product = {
                _id: item._id,
                title: item.title,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
                qty: +qty
            }
            const {data:{wishlist}} = await axios.post(`/api/user/wishlist`,{product},config);
            dispatch({type: 'ADD_TO_WISHLIST', payload: wishlist})
        } 
        catch (error) {
            console.error(error);
        }
    }
    const getWishlist = async () => {
        try {
            setLoading()
            const {data:{wishlist}} = await axios.get(`/api/user/wishlist`,config);
            dispatch({type: 'GET_WISHLIST', payload: wishlist})
        } 
        catch (error) {
            console.error(error);
        }
    }
    const deleteWishlist = async (id) => {
        try {
            setLoading()
            const {data:{wishlist}} = await axios.delete(`/api/user/wishlist/${id}`,config);
            dispatch({type: 'DELETE_WISHLIST', payload: wishlist})
        } 
        catch (error) {
            console.error(error);
        }
    }
    const setLoading = () => {
        dispatch({type: 'SET_LOADING'})
    }
    const resetCart = () => {
        dispatch({type: 'RESET_CART'})

    }
  return (
    <ProductContext.Provider value={{
        products: state.products,
        product: state.product,
        loading: state.loading,
        cart: state.cart,
        wishlist: state.wishlist,
        getProducts,
        getProduct,
        addToCart,
        updateCart,
        deleteItemOfCart,
        addToWhislist,
        getWishlist,
        deleteWishlist,
        getCarts,
        resetCart
    }}>
        {children}
    </ProductContext.Provider>
  )
}

export default ProductState