import { createSlice } from "@reduxjs/toolkit";

const initialState = { toggle: false, notification: null }
const toggleSlice = createSlice({
    name: 'toggle',
    initialState: initialState,
    reducers: {
        toggleCart (state) {
            state.toggle = !state.toggle
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
})

export const toggleActions = toggleSlice.actions;

export default toggleSlice.reducer; 