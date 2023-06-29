import { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import axios from "axios";

const AuthState = ({ children }) => {
    const initialState = {
        loginUser: {},
        profile: {},
        users: [],
        followUser: {},
        loading: false,
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const login = async ({email, password}) => {
        try {
            dispatch({type: 'USER_LOADING'})
            const config = {
                headers:{'Content-Type': 'application/json'}
            }
            const { data } = await axios.post(`/api/auth/login`, {email, password}, config)
            dispatch({
                type: 'LOGIN',
                payload: data
            })
            let userObj ={
                name:data?.foundUser?.firstName,
                username:data?.foundUser?.username,
                id:data?.foundUser?._id,
                token:data?.encodedToken
            }
            localStorage.setItem('user', JSON.stringify(userObj))
        } 
        catch (error) {
            console.error(error);
        }
    }
    const register = async ({email, password, firstName, lastName}) => {
        try {
            dispatch({type: 'USER_LOADING'})
            const config = {
                headers:{'Content-Type': 'application/json'}
            }
            const { data } = await axios.post(`/api/auth/signup`,{email, password, firstName, lastName}, config)
            dispatch({
                type: 'REGISTER',
                payload: data
            })
            let userObj ={
                name:data?.createdUser?.firstName,
                token:data?.encodedToken,
                username:data?.createdUser?.username,
                id:data?.createdUser?._id,
            }
            localStorage.setItem('user', JSON.stringify(userObj))
        } 
        catch (error) {
            console.error(error);
        }
    }
    const getAllUsers = async () => {
        try {
            const config = {
                headers:{'Content-Type': 'application/json'}
            }
            const { data } = await axios.get(`/api/users`,{}, config)
            dispatch({
                type: 'USERS',
                payload: data.users
            })
        } 
        catch (error) {
            console.error(error);
        }
    }
    const searchedUser = async (data) => {
        try {
            dispatch({
                type: 'USERS',
                payload: data
            })
        } 
        catch (error) {
            console.error(error);
        }
    }
    const getProfile = async (userId) => {
        try {
            const config = {
                headers:{'Content-Type': 'application/json'}
            }
            const { data } = await axios.get(`/api/users/${userId}`,{}, config)
            dispatch({
                type: 'GET_PROFILE',
                payload: data.user
            })
        } 
        catch (error) {
            console.error(error);
        }
    }
    const updateProfile = async (userData) => {
        try {
            const config = {
                headers:{'Content-Type': 'application/json', authorization: token}
            }
            const { data } = await axios.post(`/api/users/edit`,{userData}, config)
            dispatch({
                type: 'UPDATE_PROFILE',
                payload: data.user
            })
        } 
        catch (error) {
            console.error(error);
        }
    }
    const followUsers = async (userId) => {
        try {
            const config = {
                headers:{'Content-Type': 'application/json', authorization: token}
            }
            const { data } = await axios.post(`/api/users/follow/${userId}`,{}, config)
            dispatch({
                type: 'FOLLOW_USER',
                payload: data.user
            })
        } 
        catch (error) {
            console.error(error);
        }
    }
    const unfollowUsers = async (userId) => {
        try {
            const config = {
                headers:{'Content-Type': 'application/json', authorization: token}
            }
            const { data } = await axios.post(`/api/users/unfollow/${userId}`,{}, config)
            dispatch({
                type: 'UNFOLLOW_USER',
                payload: data.user
            })
        } 
        catch (error) {
            console.error(error);
        }
    }
    const resetAuth = () => {
        dispatch({ type: 'RESET_AUTH' })
    }
    return (
        <AuthContext.Provider value={{
            loginUser: state.loginUser,
            users: state.users,
            profile: state.profile,
            followUser: state.followUser,
            loading: state.loading,
            login,
            register,
            resetAuth,
            getAllUsers,
            followUsers,
            unfollowUsers,
            getProfile,
            updateProfile,
            searchedUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;