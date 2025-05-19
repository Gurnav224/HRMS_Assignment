import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


// Create a consistent API instance with authentication
const API = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

// Add an interceptor to include credentials and handle browser differences
API.interceptors.request.use(
    config => {

        return config;
    },
    error => Promise.reject(error)
);

const initialState = {
    candidates: [],
    resume: '',
    loading: false,
    error: null
}

export const getCandidatesAsync = createAsyncThunk("candidate/getCandidates", async (_, { rejectWithValue }) => {
    try {
        const res = await API.get('/candidate/all');
        return res.data;
    } catch (error) {
        return rejectWithValue({
            message: error.response?.data?.message || 'Failed to fetch candidates',
            status: error.response?.status
        })
    }
})


export const getCandidatesResumeAsync = createAsyncThunk("candidate/getCandidateResume", async (candidateId, { rejectWithValue }) => {
    try {
        console.log("candidateId in thunk:", candidateId);
        if (!candidateId) {
            throw new Error("Candidate ID is required");
        }
        const res = await API.get(`/candidate/resume/${candidateId}`);
        // Extract the resumeUrl from the response
        console.log(res.data)
        return res.data.resumeUrl || res.data;
    } catch (error) {
        return rejectWithValue({
            message: error.response?.data?.message || error.message || 'Failed to fetch candidate resume',
            status: error.response?.status
        });
    }
})


export const createNewCandidateAsync = createAsyncThunk("candidate/createCandidate", async (candidate, { rejectWithValue }) => {
    try {
        const formData = new FormData();

        for (const key in candidate) {
            if (key === 'resume' && candidate[key] instanceof File) {
                formData.append('resume', candidate[key], candidate[key].name);
            } else {
                formData.append(key, candidate[key]);
            }
        }

        const res = await API.post('/candidate/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue({
            message: error.response?.data?.message || 'Failed to create candidate',
            status: error.response?.status
        })
    }
})


export const deletetCandidateAsync = createAsyncThunk("candidate/deleteCandidate", async (candidateId, { rejectWithValue }) => {
    try {
        const res = await API.delete(`/candidate/${candidateId}`);
        return res.data;
    } catch (error) {
        return rejectWithValue({
            message: error.response?.data?.message || 'Failed to delete candidate',
            status: error.response?.status
        })
    }
});


export const updateCandidateStatusAsync = createAsyncThunk("candidate/updateCandidateStatus", async ({ candidateId, newStatus }, { rejectWithValue }) => {
    try {
        const res = await API.patch(`/candidate/status/${candidateId}`, { status: newStatus });
        return res.data;
    } catch (error) {
        return rejectWithValue({
            message: error.response?.data?.message || 'Failed to update candidate status',
            status: error.response?.status
        })
    }
})


export const candidateSlice = createSlice({
    name: 'candidate',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCandidatesAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getCandidatesAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.candidates = action.payload;
        })
        builder.addCase(getCandidatesAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(createNewCandidateAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(createNewCandidateAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.candidates = [...state.candidates , action.payload];
        })
        builder.addCase(getCandidatesResumeAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getCandidatesResumeAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.resume = action.payload;

            // For Cloudinary URLs, create a proxy request without credentials
            if (typeof action.payload === 'string' && action.payload.includes('cloudinary.com')) {
                // Create a new axios instance without credentials for Cloudinary
                axios.get(action.payload, {
                    responseType: 'blob',
                    withCredentials: false
                })
                    .then(response => {
                        const url = URL.createObjectURL(response.data);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'resume.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                    })
                    .catch(error => {
                        console.error("Error downloading resume:", error);
                    });
            }
            // Handle other response types as before
            else if (typeof action.payload === 'string' && action.payload.startsWith('data:')) {
                // Base64 handling remains the same
            }
        })
        builder.addCase(getCandidatesResumeAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })

        builder.addCase(deletetCandidateAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(deletetCandidateAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.candidates = state.candidates.filter(candidate => candidate._id !== action.meta.arg);
        })
        builder.addCase(deletetCandidateAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })

    }
})

export default candidateSlice.reducer;
