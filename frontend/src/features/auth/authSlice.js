import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL


// Create a reusable axios instance with proper configuration
const API = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

// Add an interceptor to include token in headers for Chrome
API.interceptors.request.use(
    config => {
        return config;
    },
    error => Promise.reject(error)
);

// Use this API instance in your auth functions
export const registerUser = createAsyncThunk("auth/register", async (credentials, { rejectWithValue }) => {
    try {
        const res = await API.post('auth/register', credentials);
        return res.data;
    } catch (error) {
        return rejectWithValue({
            message: error.response?.data?.message || 'Registration failed',
            status: error.response?.status
        })
    }
})

export const loginUser = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        const res = await API.post('auth/login', credentials);
        return res.data;
    } catch (error) {
        return rejectWithValue({
            message: error.response?.data?.message || 'Login failed',
            status: error.response?.status
        })
    }
})




// initial auth state

const initialState = {
    loading: false,
    error: null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('isAuthenticated')
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload.user;
            state.isAuthenticated = true
            state.token = action.payload.token;




            localStorage.setItem('isAuthenticated', 'true')
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            localStorage.setItem('token', action.payload.token)
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.isAuthenticated = true
            state.user = action.payload.user;
            state.token = action.payload.token;

            localStorage.setItem('isAuthenticated', 'true')
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            localStorage.setItem('token', action.payload.token)
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;
