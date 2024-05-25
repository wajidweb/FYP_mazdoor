import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { db , storage} from "../../services/firebase"; // Adjust the path according to your project structure
import { setDoc, doc, collection, where , query, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const setJob = createAsyncThunk(
    'jobs/setJob',
    async (jobData, { rejectWithValue }) => {
      try {
        const { imageFile, employerName, employerId, ...jobDetails } = jobData;
        
        // Handle image upload if there is an image file
        let imageUrl = '';
        if (imageFile) {
          const imageRef = ref(storage, `jobs/${uuidv4()}-${imageFile.name}`);
          const snapshot = await uploadBytes(imageRef, imageFile);
          imageUrl = await getDownloadURL(snapshot.ref);
        }
  
        if (!jobDetails.id) {
          jobDetails.id = uuidv4();
          jobDetails.dateCreated = new Date();
          jobDetails.datePosted = new Date();
        }
        jobDetails.dateUpdated = new Date();
        if (imageUrl) {
          jobDetails.imageUrl = imageUrl; // Add imageUrl to job details
        }
        
        // Include employer details in the job data
        jobDetails.employerName = employerName;
        jobDetails.employerId = employerId;
  
        const jobsRef = collection(db, 'jobs');
        await setDoc(doc(jobsRef, jobDetails.id), jobDetails, {
          merge: true,
        });
        return { id: jobDetails.id };
      } catch (error) {
        console.log('error.message', error.message);
        return rejectWithValue(error.message);
      }
    }
  );


  export const fetchJobsByEmployerId = createAsyncThunk(
    'jobs/fetchJobsByEmployerId',
    async (employerId, { rejectWithValue }) => {
      try {
        const q = query(collection(db, 'jobs'), where('employerId', '==', employerId));
        const querySnapshot = await getDocs(q);
        const jobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return jobs;
      } catch (error) {
        console.error('Error fetching jobs: ', error);
        return rejectWithValue(error.message);
      }
    }
  );



const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setJob.fulfilled, (state, action) => {
        state.loading = false;
        
      })
      .addCase(setJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchJobsByEmployerId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobsByEmployerId.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobsByEmployerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobsSlice.reducer;
