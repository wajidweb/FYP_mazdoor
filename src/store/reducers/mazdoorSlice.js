import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../services/firebase";
import { doc, getDoc , setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

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

// Set mazdoor data
export const setMazdoor = createAsyncThunk(
    'mazdoor/setMazdoor',
    async ({ laborId, formData }, thunkAPI) => {
      try {
        const laborDocRef = doc(db, 'mazdoors', laborId);
        
        // Check if labor data already exists
        const laborDoc = await getDoc(laborDocRef);
    
        if (laborDoc.exists()) {
          // Update existing labor data
          await setDoc(laborDocRef, formData, { merge: true });
    
          return { ...formData, laborId: laborDoc.data().laborId };
        } else {
            throw new Error('Labor data does not exist');
        }
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
      })
      .addCase(setMazdoor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setMazdoor.fulfilled, (state, action) => {
        state.loading = false;
        state.mazdoor = action.payload;
      })
      .addCase(setMazdoor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mazdoorSlice.reducer;
