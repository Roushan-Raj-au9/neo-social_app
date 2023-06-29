import { useReducer } from 'react';
import PostContext from "./postContext";
import PostReducer from "./postReducer";
import axios from 'axios';

const PostState = ({children}) => {
    const initialState = {
        loading: false,
        posts: [],
        bookmarks: [],
        createSuccess: false,
    }
    const [state, dispatch] = useReducer(PostReducer, initialState);
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const createPost = async (content) => {
        try {
            dispatch({type: 'POST_LOADING'})
            const config = {
                headers:{'Content-Type': 'application/json', authorization: token}
            }
            const { data } = await axios.post(`/api/posts/`,{postData:content}, config)
            dispatch({
                type: 'CREATE_POST',
                payload: data.posts
            })
        } 
        catch (error) {
            dispatch({type: 'POST_LOADING_RESET'})
            console.error(error);
        }
    }
    const updatePost = async (content, id) => {
        try {
            dispatch({type: 'POST_LOADING'})
            const config = {
                headers:{'Content-Type': 'application/json', authorization: token}
            }
            const { data } = await axios.post(`/api/posts/edit/${id}`,{postData:content}, config)
            dispatch({
                type: 'UPDATE_POST',
                payload: data.posts
            })
        } 
        catch (error) {
            dispatch({type: 'POST_LOADING_RESET'})
            console.error(error);
        }
    }
    const deletePost = async (id) => {
        try {
            dispatch({type: 'POST_LOADING'})
            const config = {
                headers:{'Content-Type': 'application/json', authorization: token}
            }
            const { data } = await axios.delete(`/api/posts/${id}`, config)
            dispatch({
                type: 'DELETE_POST',
                payload: data.posts
            })
        } 
        catch (error) {
            dispatch({type: 'POST_LOADING_RESET'})
            console.error(error);
        }
    }
    const likePost = async (id) => {
        try {
            const config = {
                headers:{'Content-Type': 'application/json', authorization: token}
            }
            const { data } = await axios.post(`/api/posts/like/${id}`, {}, config)
            dispatch({
                type: 'LIKE_POST',
                payload: data.posts
            })
        } 
        catch (error) {
            dispatch({type: 'POST_LOADING_RESET'})
            console.error(error);
        }
    }
    const dislikePost = async (id) => {
        try {
            const config = {
                headers:{'Content-Type': 'application/json', authorization: token}
            }
            const { data } = await axios.post(`/api/posts/dislike/${id}`,{}, config)
            dispatch({
                type: 'DIS_LIKE_POST',
                payload: data.posts
            })
        } 
        catch (error) {
            dispatch({type: 'POST_LOADING_RESET'})
            console.error(error);
        }
    }
    const addToBookmark = async (postId) => {
        try {
            const config = {
                headers:{'Content-Type': 'application/json', authorization: token}
            }
            const { data } = await axios.post(`/api/users/bookmark/${postId}`,{}, config)
            dispatch({
                type: 'ADD_BOOKMARK',
                payload: data.bookmarks
            })
        } 
        catch (error) {
            dispatch({type: 'POST_LOADING_RESET'})
            console.error(error);
        }
    }
    const removeFromBookmark = async (postId) => {
        try {
            const config = {
                headers:{'Content-Type': 'application/json', authorization: token}
            }
            const { data } = await axios.post(`/api/users/remove-bookmark/${postId}`,{}, config)
            dispatch({
                type: 'REMOVE_BOOKMARK',
                payload: data.bookmarks
            })
        } 
        catch (error) {
            dispatch({type: 'POST_LOADING_RESET'})
            console.error(error);
        }
    }
    const getBookmarks = async () => {
        try {
            const config = {
                headers:{'Content-Type': 'application/json', authorization: token}
            }
            const { data } = await axios.get(`/api/users/bookmark/`,{}, config)
            dispatch({
                type: 'ALL_BOOKMARKS',
                payload: data.bookmarks
            })
        } 
        catch (error) {
            dispatch({type: 'POST_LOADING_RESET'})
            console.error(error);
        }
    }
    const getPosts = async () => {
        try {
            dispatch({type: 'POST_LOADING'})
            const config = {
                headers:{'Content-Type': 'application/json'}
            }
            const { data } = await axios.get(`/api/posts/`,{}, config)
            dispatch({
                type: 'GET_POSTS',
                payload: data.posts
            })
        } 
        catch (error) {
            dispatch({type: 'POST_LOADING_RESET'})
            console.error(error);
        }
    }
    return(
        <PostContext.Provider value={{
            loading: state.loading,
            posts: state.posts,
            bookmarks: state.bookmarks,
            createSuccess: state.createSuccess,
            createPost,
            getPosts,
            updatePost,
            deletePost,
            likePost,
            dislikePost,
            removeFromBookmark,
            addToBookmark,
            getBookmarks,
        }}>
            {children}
        </PostContext.Provider>
    )
}

export default PostState;