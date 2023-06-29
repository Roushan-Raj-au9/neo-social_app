import { useReducer } from "react";
import CategoryContext from "./categoryContext";
import CategoryReducer from "./categoryReducer";
import axios from "axios";

const CategoryState = ({children}) => {
    const initialState = {
        categories: [],
        loading: false
    };
    const [state, dispatch] = useReducer(CategoryReducer, initialState);
    const getCategories = async () => {
        try {
            setLoading()
            const {data} = await axios.get(`/api/categories`)
            dispatch({type: 'GET_CATEGORY', payload: data.categories})
        } 
        catch (error) {
            console.error(error);
        }
    }
    const setLoading = () => {
        dispatch({type: 'SET_LOADING'})
    }
  return (
    <CategoryContext.Provider value={{
        categories: state.categories,
        loading: state.loading,
        getCategories
    }}>
        {children}
    </CategoryContext.Provider>
  )
}

export default CategoryState;