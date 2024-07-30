import { createSlice } from "@reduxjs/toolkit";

const initialState = { toggle: false }
const toggleSlice = createSlice({
    name: 'toggle',
    initialState: initialState,
    reducers: {
        toggleCart (state) {
            state.toggle = !state.toggle
        }
    }
})

export const toggleActions = toggleSlice.actions;

export default toggleSlice.reducer;