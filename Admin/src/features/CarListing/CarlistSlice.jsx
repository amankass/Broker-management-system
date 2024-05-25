import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import carService from "./CarlistService";

export const getCarlist = createAsyncThunk(
  "car/get-carlist",
  async (thunkAPI) => {
    try {
      return await carService.getCarlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCarListing = createAsyncThunk(
  "car/delete-car",
  async (userId, thunkAPI) => {
    try {
      await carService.deleteCarListing(userId);
      return userId; // Return the deleted broker's ID
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  carLists: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const carSlice = createSlice({
  name: "cars", // Change the name to "cars"
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCarlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCarlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.carLists = action.payload;
      })
      .addCase(getCarlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default carSlice.reducer;
