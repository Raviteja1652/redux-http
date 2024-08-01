import axios from "axios";
import { toggleActions } from "./toggle-slice";
import { cartActions } from "./cart-slice";


export const fetchCartData = (cart) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const res = await axios.get('https://api-calls-prep-default-rtdb.firebaseio.com/cart-http.json')
            const data = await res.data
            return data
        }

        try {
            const fetchedData = await fetchData()

            dispatch(cartActions.replaceCart({
                items: fetchedData.items || [],
                totalQuantity: fetchedData.totalQuantity 
            }))

        } catch (error) {
            dispatch(toggleActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Fetching Data Failed'
            }))
            console.log(error)
        }
    }
} 

export const sendData = (cart) => {
    return async (dispatch) => {
        dispatch(toggleActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart Data!'
        }));
          
        const sendRequest = async () => {
            const res = await axios.put('https://api-calls-prep-default-rtdb.firebaseio.com/cart-http.json', {
                items: cart.items,
                totalQuantity: cart.totalQuantity
            });
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

