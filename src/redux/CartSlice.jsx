import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"



export const getCart = createAsyncThunk('getCart', async (id) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/cart/${id}`)
        if (!response.data) {
            throw new Error('Cart not found')
        }
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error, "failed to retrieve cart");
        throw error;
    }
})


//add to cart
export const addToCart = createAsyncThunk('cartItems/addToCart', async ({ userId, productId, quantity }) => {


    try {
        const response = await axios.post(`http://localhost:5001/api/cart`, { userId, productId, quantity });

        if (!response.data) {
            throw new Error('Failed to add');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
});

//update Cart Quantity
export const updateQuantity = createAsyncThunk('cartItems/updateQuantity', async ({ userId, productId, action }) => {
    try {
        const response = await axios.put(`http://localhost:5001/api/cart/${userId}/${productId}`, { action });

        if (!response.data) {
            throw new Error('Failed in updating');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
});
//delete cart product
export const deleteCart = createAsyncThunk('cartItems/deleteProduct', async ({ userId, productId }) => {
    try {
        const response = await axios.delete(`http://localhost:5001/api/cart/${userId}/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

//createing checkout session
export const createCheckoutSession = createAsyncThunk(
    'cart/createCheckoutSession',
    async ({ cartItems, userId,totalAmount }) => {
        try {
            const response = await axios.post( `http://localhost:5001/api/stripe/create_checkout_session`,{ cartItems, userId ,totalAmount});
            console.log(response.data);
            console.log(cartItems);
        
            if (response.data.url) {

                window.location.href = response.data.url
            } 
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const retrieveCheckoutSession = createAsyncThunk('retrieveCheckoutSession', async ({ id, userId }) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/stripe/retrive-checkout-session/${id}/${userId}`,);
        console.log("response data", response.data);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
});


//User Order
export const getUserOrder = createAsyncThunk('getUserOrder',async(id)=>{
    try{
        const response = await axios.get(`http://localhost:5001/api/order/details/${id}`)
        return response.data;
    }catch(error){
        console.log(error.message)
    }
    
})




const initialState = {
    cartItems: [],
    cart: [],
    status: 'idle',
    productCount: 0,
    error: null,
    UserOrders:[],
    orderDetails:[],
   
};

const cartSlice = createSlice({
    name: "cartItem",
    initialState,
    reducers: {
        setIsgetCart: (state, action) => {
            state.isgetCart = action.payload;
        },
        setIsaddToCart: (state, action) => {
            state.isaddToCart = action.payload;
        },
    },
    extraReducers: (bulider) => {
        bulider
            .addCase(getCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.status = 'idle';
                state.cartItems = action.payload;
                state.productCount = action.payload.totalQuantity
            })
            .addCase(getCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to retrieve cart';
            })
            .addCase(addToCart.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cartItems = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateQuantity.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.status = 'succeeded';

            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.status = 'succeeded';

            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to delete product';
            })
            .addCase(createCheckoutSession.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createCheckoutSession.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.checkoutSessionId = action.payload;
            })
            .addCase(createCheckoutSession.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to create checkout session';
            })
            .addCase(retrieveCheckoutSession.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(retrieveCheckoutSession.fulfilled, (state, { payload }) => {
                state.loading = false
                state.orderDetails = payload
                console.log('state', state.orderDetails);
            })
            .addCase(retrieveCheckoutSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred while retrieving session data";
            })
            .addCase(getUserOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserOrder.fulfilled, (state, action) => {
                state.loading = true;
                state.UserOrders = action.payload;
                console.log('state', state.UserOrders);
            })
            .addCase(getUserOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred while retrieving session data";
            })

    },
});
export const { setIsgetCart, setIsaddToCart, setIsProductCount } = cartSlice.actions;
export default cartSlice.reducer;
