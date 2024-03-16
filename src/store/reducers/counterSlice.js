import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
  isLoggedIn: false,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {increment, decrement , setLoggedIn} = counterSlice.actions;
export default counterSlice.reducer;