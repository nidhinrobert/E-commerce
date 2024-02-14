import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk('getProduct', async ({categoryId}) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/product?categoryId=${categoryId}`)
        if (!response.data) {
            throw new Error('product not found')
        }
        console.log(response.data);

        return response.data; 
    } catch (error) {
        console.log(error, "failed to retrieve Items");
        throw error;
    }
})

export const addProduct = createAsyncThunk('productItems/addProduct', async ({ product }) => {
    const formData = new FormData();
    product.images.map((image) => formData.append("images", image));
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('discount', product.discount);
    formData.append('specifications', product.specifications);
    formData.append('description', product.description);
    formData.append('categoryId', product.categoryId);
    
    try {
        const response = await axios.post(`http://localhost:5001/api/product`, formData);

        if (!response.data) {
            throw new Error('Failed to add');
        }
        return response.data;
    } catch (error) {
        throw error; 
    }
});

export const getProductbyId = createAsyncThunk('productItems/getProductbyId', async (id) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/product/${id}`);
        if (!response.data) {
            throw new Error('failed to get data')
        }
        return response.data
    } catch (error) {
        throw new Error("failed to retrieve data")
    }
})

export const editProduct = createAsyncThunk('productItems/editProduct', async (data) => {
    const { id } = data;
    const formData = new FormData();
    data.images.map((image) => formData.append("images", image));
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('discount', data.discount);
    formData.append('specifications', data.specifications);
    formData.append('description', data.description);
    formData.append('categoryId', data.categoryId);

    try {
        const response = await axios.put(`http://localhost:5001/api/product/${id}`, formData);

        if (!response.data) {
            throw new Error("Failed to edit product: No response data");
        }
        return { id, data: response.data };
        
    } catch (error) {
        throw new Error(`Failed to edit product: ${error.message}`);
    }
});

export const deleteProduct = createAsyncThunk('productItems/deleteProduct',async(id) => {
    try{
        const response = await axios.delete(`http://localhost:5001/api/product/${id}`)
        if (!response.data){
            throw new Error ("failed to delete ")
        }

    }catch(error){
        throw new Error ('failed to delete')
    }
})

    const initialState = {
        productItems: [],
        product:[],
        status: 'idle',
        error: null,
        isaddProduct: false,
    };
    
    const productSlice = createSlice({
        name: "productItem",
        initialState,
        reducers: {
            setIsgetProduct: (state, action) => {
                state.isgetProduct = action.payload;
            },
            setIsaddProduct: (state, action) => {
                state.isaddProduct = action.payload;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(getProduct.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(getProduct.fulfilled, (state, action) => {
                    state.status = 'idle';
                    state.productItems = action.payload.productItems;
                })
                .addCase(getProduct.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || 'Failed to retrieve products';
                })
                .addCase(getProductbyId.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(getProductbyId.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.productItems = action.payload;
                })
                .addCase(getProductbyId.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || 'Failed to retrieve product by ID';
                })
                .addCase(editProduct.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(editProduct.fulfilled, (state, action) => {
                    const { id, data } = action.payload;
                    state.status = 'succeeded';
                    state.productItems = state.productItems.map((productItem) =>
                        productItem._id === id ? { ...productItem, ...data } : productItem
                    );
                })
                .addCase(editProduct.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || 'Failed to edit product';
                })
                .addCase(deleteProduct.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(deleteProduct.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.productItems = state.productItems.filter((productItem) => productItem._id !== action.payload);
                })
                .addCase(deleteProduct.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || 'Failed to delete product';
                });
        },
    });
    export const{setIsgetProduct,setIsaddProduct }= productSlice.actions;
    export default productSlice.reducer;
