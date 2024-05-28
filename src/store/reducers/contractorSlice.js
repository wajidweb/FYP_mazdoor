import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../services/firebase";
import { doc, getDoc, setDoc, collection, query, getDocs } from "firebase/firestore";

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


export const addLaborToContractor = createAsyncThunk(
  'contractors/addLaborToContractor',
  async ({ contractorId, laborId }, { rejectWithValue }) => {
    try {
      const laborDocRef = doc(db, 'mazdoors', laborId);
      const laborDoc = await getDoc(laborDocRef);

      if (!laborDoc.exists()) {
        throw new Error('Labor not found');
      }

      const laborData = laborDoc.data();

      const contractorLaborsCollectionRef = collection(db, 'contractors', contractorId, 'mazdoors');
      const laborDocInContractorRef = doc(contractorLaborsCollectionRef, laborId);

      await setDoc(laborDocInContractorRef, laborData);

      return laborData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchMazdoorsByContractorId = createAsyncThunk(
  'contractor/fetchMazdoorsByContractorId',
  async (contractorId, { rejectWithValue }) => {
    try {
      // Reference the subcollection 'mazdoors' under the specified Contractor
      const contractorMazdoorsCollectionRef = collection(db, 'contractors', contractorId, 'mazdoors');

      // Query to get all documents from the 'mazdoors' subcollection for the specific Contractor
      const q = query(contractorMazdoorsCollectionRef);

      // Fetch the documents
      const querySnapshot = await getDocs(q);

      // Array to hold the fetched Mazdoors data
      const mazdoorsData = [];

      // Iterate through the documents and extract the data
      querySnapshot.forEach((doc) => {
        // Push the data of each document to the mazdoorsData array
        mazdoorsData.push({ id: doc.id, ...doc.data() });
      });

      // Return the fetched Mazdoors data
      return mazdoorsData;
    } catch (error) {
      // If an error occurs, reject the promise with the error message
      return rejectWithValue(error.message);
    }
  }
);


const contractorSlice = createSlice({
  name: "contractor",
  initialState: {
    contractor: null,
    loading: false,
    error: null,
    mazdoors: [],
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
      })
      .addCase(addLaborToContractor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLaborToContractor.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.contractor) {
          state.contractor = { labors: [] };
        }
        if (!Array.isArray(state.contractor.labors)) {
          state.contractor.labors = [];
        }
        state.contractor.labors.push(action.payload);
      })
      .addCase(addLaborToContractor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMazdoorsByContractorId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMazdoorsByContractorId.fulfilled, (state, action) => {
        state.loading = false;
        state.mazdoors = action.payload; // Set fetched Mazdoors data to the state
      })
      .addCase(fetchMazdoorsByContractorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contractorSlice.reducer;
