import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: true, // Start in loading state until the first auth verification completes
        error: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { setUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;