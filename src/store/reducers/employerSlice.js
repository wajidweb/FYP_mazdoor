import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const fetchEmployerById = createAsyncThunk(
  "employer/fetchById",
  async (employerId, thunkAPI) => {
    try {
      const laborDoc = await getDoc(doc(db, "employers", employerId));
      if (!laborDoc.exists()) {
        throw new Error("employer not found");
      }
      return { id: laborDoc.id, ...laborDoc.data() };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Set employer data
export const setEmployer = createAsyncThunk(
  "employer/setEmployer",
  async ({ employerId, formData }, thunkAPI) => {
    try {
      const employerDocRef = doc(db, "employers", employerId);

      // Check if employer data already exists
      const employerDoc = await getDoc(employerDocRef);

      if (employerDoc.exists()) {
        // Update existing labor data
        await setDoc(employerDocRef, formData, { merge: true });

        return { ...formData, employerId: employerDoc.data().employerId };
      } else {
        throw new Error("employer data does not exist");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const employerSlice = createSlice({
  name: "employer",
  initialState: {
    employer: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployerById.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = action.payload;
      })
      .addCase(fetchEmployerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(setEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = action.payload;
      })
      .addCase(setEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employerSlice.reducer;
