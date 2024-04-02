import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const getAllOrders = createAsyncThunk('getAllOrders',async({currentPage,itemsPerPage,search})=>{
    try{
        const response = await axios.get(`http://localhost:5001/api/order?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&search=${search}`);
        return response.data;
    }catch(error){
        return error;
    }
})
export const getCustomers = createAsyncThunk('getCustomers', async ({currentPage,itemsPerPage,search}) => {
    try {
        const response = await axios.get(`http://localhost:5001/user?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&search=${search}`);
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

const initialState={
    error:'',
    orders:[],
    orderById:[],
    Customers:[],
    search:"",
    currentPage:1,
    itemsPerPage:3,
    customersCount:0,
    ordercurrentPage:1,
    orderitemsPerPage:3,
    ordersCount:0,
}

const AdminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{

        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
            console.log("state",state.currentPage);
        },
        setItemsPerPage: (state,action) => {
            state.itemsPerPage = action.payload;
        },
        setorderCurrentPage: (state, action) => {
            state.currentPage = action.payload;
            console.log("state",state.currentPage);
        },
        setorderItemsPerPage: (state,action) => {
            state.itemsPerPage = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllOrders.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.ordersCount = action.payload.totalCount;
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
             state.customersCount = action.payload.totalCount;
        })
    }
});
export const {setCurrentPage,setItemsPerPage,setorderCurrentPage,setorderItemsPerPage,setSearchValue} = AdminSlice.actions;
export default AdminSlice.reducer;