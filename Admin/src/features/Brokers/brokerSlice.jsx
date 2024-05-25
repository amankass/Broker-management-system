import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brokerService from "./brokerService";
export const createBroker = createAsyncThunk(
  "broker/create-broker",
  async (broker, thunkAPI) => {
    try {
      return await brokerService.createBroker(broker);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getBroker = createAsyncThunk(
  "broker/get-broker",
  async (_, thunkAPI) => {
    try {
      return await brokerService.getBroker();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBroker = createAsyncThunk(
  "broker/delete-broker",
  async (userId, thunkAPI) => {
    try {
      await brokerService.deleteBroker(userId);
      return userId; // Return the deleted broker's ID
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBrokerStatus = createAsyncThunk(
  "broker/update-broker-status",
  async ({ userId, status }, thunkAPI) => {
    try {
      await brokerService.updateBrokerStatus(userId, status);
      return { userId, status };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  brokers: [], // Corrected from "customers" to "brokers"
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const brokerSlice = createSlice({
  name: "broker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBroker.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBroker.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brokers = action.payload; // Corrected from "customers" to "brokers"
      })
      .addCase(getBroker.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload; // Corrected from "action.error" to "action.payload"
      })
      .addCase(createBroker.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBroker.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.creatbroker = action.payload; // Corrected from "customers" to "creatbrokers"
      })
      .addCase(createBroker.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload; // Corrected from "action.error" to "action.payload"
      });
  },
});

export default brokerSlice.reducer;
