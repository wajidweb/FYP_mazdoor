import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const fetchContractorById = createAsyncThunk(
  "contractor/fetchById",
  async (contractorId, thunkAPI) => {
    try {
      const contractorDoc = await getDoc(doc(db, "contractors", contractorId));
      if (!contractorDoc.exists()) {
        throw new Error("contractors not found");
      }
      return { id: contractorDoc.id, ...contractorDoc.data() };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Set contractor data
export const setContractor = createAsyncThunk(
  "contractor/setContractor",
  async ({ contractorId, formData }, thunkAPI) => {
    try {
      const contractorDocRef = doc(db, "contractors", contractorId);

      // Check if contractor data already exists
      const contractorDoc = await getDoc(contractorDocRef);

      if (contractorDoc.exists()) {
        // Update existing contractor data
        await setDoc(contractorDocRef, formData, { merge: true });

        return { ...formData, contractorId: contractorDoc.data().contractorId };
      } else {
        throw new Error("contractor data does not exist");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const contractorSlice = createSlice({
  name: "contractor",
  initialState: {
    contractor: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContractorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContractorById.fulfilled, (state, action) => {
        state.loading = false;
        state.contractor = action.payload;
      })
      .addCase(fetchContractorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(setContractor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setContractor.fulfilled, (state, action) => {
        state.loading = false;
        state.contractor = action.payload;
      })
      .addCase(setContractor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contractorSlice.reducer;
