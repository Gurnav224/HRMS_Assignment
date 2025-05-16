import { createSlice } from "@reduxjs/toolkit";


// initial auth state

const initialState = {
    loading:false,
    error:null,
    user:null,
    token:null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{

    }
})


export default authSlice.reducer;