import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import HouseService from "./HouseListService";

export const getHouse = createAsyncThunk(
  "house/get-house",
  async (thunkAPI) => {
    try {
      return await HouseService.getHouse();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteHouseListing = createAsyncThunk(
  "house/delete-house",
  async (userId, thunkAPI) => {
    try {
      await HouseService.deleteHouseListing(userId);
      return userId; // Return the deleted broker's ID
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  houseLists: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.houseLists = action.payload;
      })
      .addCase(getHouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default houseSlice.reducer;
