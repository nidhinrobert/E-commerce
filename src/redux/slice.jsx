import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategory = createAsyncThunk('getCategory', async () => {
    try {
        const response = await axios.get(`http://localhost:5001/api/category`);
        if(!response.data){
            throw new Error('category not found')
        }
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log(error, "failed to retrieve Items");
        throw error;
        
    }
});

export const addCategory = createAsyncThunk('items/addCategory',async(category) =>{

    const formData = new FormData();
    formData.append('categoryImg',category.categoryImg);
    formData.append('categoryName',category.categoryName);
    formData.append('description',category.description);

    try{
        const response = await axios.post(`http://localhost:5001/api/category`,formData)

        if(!response.data){
            throw new Error('Failed to add');
        }
        return response.data;
    }catch(error){
        throw new Error('failed to add')
    }
});

export const getCategorybyId = createAsyncThunk('items/getCategorybyId', async (id) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/category/${id}`);
        if (!response.data) {
            throw new Error('failed to get data')
        }
        return response.data
    } catch (error) {
        throw new Error("failed to retrieve data")
    }
})
export const editCategory = createAsyncThunk('items/editCategory', async (data) => {
    const id = data.id;

    const formData = new FormData();
    formData.append('categoryImg', data.categoryImg);
    formData.append('categoryName', data.categoryName);
    formData.append('description', data.description);

    try {
        const response = await axios.put(`http://localhost:5001/api/category/${id}`, formData);

        if (!response.data) {
            throw new Error("Failed to edit category: No response data");
        }

        return { id, data: response.data };
    } catch (error) {
        throw new Error(`Failed to edit category: ${error.message}`);
    }
});

//gittttt

export const deleteCategory = createAsyncThunk('items/deleteCategory',async(id) => {
    try{
        const response = await axios.delete(`http://localhost:5001/api/category/${id}`)
        if (!response.data){
            throw new Error ("failed to delete ")
        }

    }catch(error){
        throw new Error ('failed to delete')
    }
})


const initialState = {
    items: [],
    category:[],
    status: 'idle',
    error: null,
    isaddCategory: false,
};

const slice = createSlice({
    name: "item",
    initialState,
    reducers: {
        setIsgetCategory: (state, action) => {
            state.isgetCategory = action.payload;
        },
        setIsaddCategory: (state, action) => {
            state.isaddCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.items = action.payload; 
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getCategorybyId.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getCategorybyId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.contact = action.payload;
            })
            .addCase(getCategorybyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                const { id, data } = action.payload;
                state.status = 'succeeded';
                state.items = state.items.map((item) =>
                    item._id === id ? { ...item, ...data } : item
                );
            })
            .addCase(editCategory.rejected, (action, state) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.status = "succeded"
                state.items = state.items.filter((items) => items._id !== action.payload);
            });
    }
});

export const { setIsgetCategory,setIsaddCategory } = slice.actions;
export default slice.reducer;
