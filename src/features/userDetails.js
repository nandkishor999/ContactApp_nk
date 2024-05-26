import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";


export const createUser = createAsyncThunk(
    "userDetail/createUser",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          "https://664edecbfafad45dfae15625.mockapi.io/nandu",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  export const showContact = createAsyncThunk(
    "showContact",
    async (args, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          "https://664edecbfafad45dfae15625.mockapi.io/nandu"
        );
        // console.log(response.data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );
  export const deleteUser = createAsyncThunk(
    "userDetail/deleteUser",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.delete(
          `https://664edecbfafad45dfae15625.mockapi.io/nandu/${id}`
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  export const updateUser = createAsyncThunk(
    "userDetail/updateUser",
    async (data, { rejectWithValue }) => {
      console.log("updated data",data)
      try {
        const response = await axios.put(
          `https://664edecbfafad45dfae15625.mockapi.io/nandu/${data.id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        user:[],
        loading : false,
        error:null,
    },
    extraReducers:(builder)=>{  // to handle promises of  createAsyncThunk
        builder
        // Create user
        .addCase(createUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user.push(action.payload);
        })
        .addCase(createUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        })
        .addCase(showContact.pending, (state) => {
            state.loading = false;
          })
          .addCase(showContact.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload; // no need to push as we are getting all the data to show
          })
          .addCase(showContact.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(deleteUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            if (id) {
              state.users = state.users.filter((ele) => ele.id !== id); // filter elements and store in map 
            }
          })
          .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(updateUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            if (id) {
              state.users = state.users.map((ele) => ele.id ===action.payload?action.payload:ele); // filter elements and store in map 
            }
          })
          .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        
  
    
    },

});
export default userDetail.reducer;