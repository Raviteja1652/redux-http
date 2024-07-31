import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleActions } from "./toggle-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
        },
        removeFromCart(state, action) {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
        increaseCount(state, action) {
            const id = action.payload;
            const existing = state.items.find(item => item.id === id);
            existing.quantity++;
            existing.totalPrice = existing.totalPrice + existing.price;
            state.totalQuantity++
        }
    }
})


export const sendData = (cart) => {
    return async (dispatch) => {
        dispatch(toggleActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart Data!'
        }));
          
        const sendRequest = async () => {
            const res = await axios.put('https://api-calls-prep-default-rtdb.firebaseio.com/cart-http.json', cart);
            const data = await res.data
            console.log(data)
        }
        
        try {
            await sendRequest()

            dispatch(toggleActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent Data Successfully'
            }));

        } catch (error) {
            dispatch(toggleActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Sending Data Failed'
            }))
        }
    }
}


export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
