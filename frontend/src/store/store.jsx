import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../features/auth/authSlice';
import { candidateSlice } from '../features/candidates/candidate.slice';


const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      candidate: candidateSlice.reducer
   }
})


export default store;