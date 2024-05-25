import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBroker: null,
  error: null,
  loading: false,
};

const brokerSlice = createSlice({
  name: "broker",
  initialState,
  reducers: {
    setCurrentBroker(state, action) {
      state.currentBroker = action.payload;
    },
    signInStart(state) {
      state.loading = true;
    },
    signInSuccess(state, action) {
      state.currentBroker = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart(state) {
      state.loading = true;
    },
    updateUserSuccess(state, action) {
      state.currentBroker = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart(state) {
      state.loading = true;
    },
    deleteUserSuccess(state) {
      state.currentBroker = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart(state) {
      state.loading = true;
    },
    signOutUserSuccess(state) {
      state.currentBroker = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCurrentBroker,
  signInFailure,
  signInStart,
  signInSuccess,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} = brokerSlice.actions;

export default brokerSlice.reducer;
