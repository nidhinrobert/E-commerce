import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const getAllOrders = createAsyncThunk('getAllOrders',async()=>{
    try{
        const response = await axios.get(`http://localhost:5001/api/order/`);
        return response.data;
    }catch(error){
        return error;
    }
})
export const getCustomers = createAsyncThunk('getCustomers', async () => {
    try {
        const response = await axios.get(`http://localhost:5001/user`);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
})

export const getOrderById = createAsyncThunk('getOrderById', async (id) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/order/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
);

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        error:'',
        orders:[],
        orderById:[],
        Customers:[],
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllOrders.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload.orders;
        })
        .addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Some error occurred";
        })
        .addCase(getOrderById.fulfilled, (state, action) => {
            state.loading = false;
            state.orderById = action.payload.orderById;
        })
        .addCase(getCustomers.fulfilled, (state, action) => {
            state.loading = false;
            state.Customers = action.payload;
        })
    }
});

export default adminSlice.reducer;