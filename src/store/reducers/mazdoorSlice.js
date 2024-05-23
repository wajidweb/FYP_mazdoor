import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";


export const fetchMazdoorById = createAsyncThunk(
  "mazdoor/fetchById",
  async (laborId, thunkAPI) => {
    try {
      const laborDoc = await getDoc(doc(db, "mazdoors", laborId));
      if (!laborDoc.exists()) {
        throw new Error("mazdoor not found");
      }
      return { id: laborDoc.id, ...laborDoc.data() };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const mazdoorSlice = createSlice({
  name: "mazdoor",
  initialState: {
    mazdoor: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMazdoorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMazdoorById.fulfilled, (state, action) => {
        state.loading = false;
        state.mazdoor = action.payload;
      })
      .addCase(fetchMazdoorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mazdoorSlice.reducer;
