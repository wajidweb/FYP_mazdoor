import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { db , storage} from "../../services/firebase"; // Adjust the path according to your project structure
import { setDoc,getDoc, doc, collection, where , query, getDocs } from "firebase/firestore";
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

  export const fetchJobs = createAsyncThunk(
    'jobs/fetchAll',
    async (_, thunkAPI) => {
      try {
        const jobsRef = collection(db, 'jobs');
        const querySnapshot = await getDocs(jobsRef);
        
        const jobs = [];
        querySnapshot.forEach((doc) => {
          jobs.push({ id: doc.id, ...doc.data() });
        });
  
        return jobs;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const applyJob = createAsyncThunk(
    'jobs/applyJob',
    async ({ jobId, laborId }, { rejectWithValue }) => {
      try {
        const applicationData = {
          laborId,
          jobId,
          appliedAt: new Date(),
        };
  
        // Create a reference to the applications subcollection under the job
        const applicationsRef = collection(db, `jobs/${jobId}/applications`);
        const applicationDocRef = doc(applicationsRef, laborId);
  
        // Save the application data
        await setDoc(applicationDocRef, applicationData);
  
        return applicationData;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const applyJobWithContractor = createAsyncThunk(
    'jobs/applyJobWithContractor',
    async ({ jobId, contractorId }, { rejectWithValue }) => {
      try {
        const applicationData = {
          contractorId,
          jobId,
          appliedAt: new Date(),
        };
  
        // Create a reference to the applications subcollection under the job
        const applicationsRef = collection(db, `jobs/${jobId}/applications`);
        const applicationDocRef = doc(applicationsRef, contractorId);
  
        // Save the application data
        await setDoc(applicationDocRef, applicationData);
  
        return applicationData;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const fetchAppliedJobsByLaborId = createAsyncThunk(
    'jobs/fetchAppliedJobsByLaborId',
    async (laborId, thunkAPI) => {
      try {
        const jobsRef = collection(db, 'jobs');
        const jobsSnapshot = await getDocs(jobsRef);
        const appliedJobs = [];
  
        for (const jobDoc of jobsSnapshot.docs) {
          const applicationsRef = collection(db, `jobs/${jobDoc.id}/applications`);
          const applicationsQuery = query(applicationsRef, where('laborId', '==', laborId));
          const applicationsSnapshot = await getDocs(applicationsQuery);
  
          if (!applicationsSnapshot.empty) {
            const jobData = jobDoc.data();
            appliedJobs.push({
              id: jobDoc.id,
              ...jobData,
              dateCreated: jobData.dateCreated?.toDate().toISOString(),
              dateUpdated: jobData.dateUpdated?.toDate().toISOString(),
            });
          }
        }
  
        return appliedJobs;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const fetchAppliedJobsByContractorId = createAsyncThunk(
    'jobs/fetchAppliedJobsByContractorId',
    async (contractorId, thunkAPI) => {
      try {
        const jobsRef = collection(db, 'jobs');
        const jobsSnapshot = await getDocs(jobsRef);
        const appliedJobs = [];
  
        for (const jobDoc of jobsSnapshot.docs) {
          const applicationsRef = collection(db, `jobs/${jobDoc.id}/applications`);
          const applicationsQuery = query(applicationsRef, where('contractorId', '==', contractorId));
          const applicationsSnapshot = await getDocs(applicationsQuery);
  
          if (!applicationsSnapshot.empty) {
            const jobData = jobDoc.data();
            appliedJobs.push({
              id: jobDoc.id,
              ...jobData,
              dateCreated: jobData.dateCreated?.toDate().toISOString(),
              dateUpdated: jobData.dateUpdated?.toDate().toISOString(),
            });
          }
        }
  
        return appliedJobs;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );



  export const fetchJobsWithLaborDetailsByEmployerId = createAsyncThunk(
    'jobs/fetchJobsWithLaborDetailsByEmployerId',
    async (employerId, thunkAPI) => {
      try {
        // Query jobs collection by employerId
        const jobsRef = collection(db, 'jobs');
        const q = query(jobsRef, where('employerId', '==', employerId));
        const jobsSnapshot = await getDocs(q);
  
        const jobsWithLaborDetails = [];
  
        for (const jobDoc of jobsSnapshot.docs) {
          const jobData = jobDoc.data();
          const applicationsRef = collection(db, `jobs/${jobDoc.id}/applications`);
          const applicationsSnapshot = await getDocs(applicationsRef);
  
          for (const applicationDoc of applicationsSnapshot.docs) {
            const applicationData = applicationDoc.data();
            const laborId = applicationData.laborId;
            const contractorId = applicationData.contractorId;
            let laborData = null;
            let contractorData = null;
  
            // Fetch labor details if laborId exists
            if (laborId) {
              const laborDocRef = doc(db, 'mazdoors', laborId);
              const laborDoc = await getDoc(laborDocRef);
  
              if (laborDoc.exists()) {
                laborData = laborDoc.data();
              }
            }
  
            // Fetch contractor details if contractorId exists
            if (contractorId) {
              const contractorDocRef = doc(db, 'contractors', contractorId);
              const contractorDoc = await getDoc(contractorDocRef);
  
              if (contractorDoc.exists()) {
                contractorData = contractorDoc.data();
              }
            }
  
            jobsWithLaborDetails.push({
              jobId: jobDoc.id,
              ...jobData,
              applicationId: applicationDoc.id,
              applicationData,
              laborId,
              laborData,
              contractorId,
              contractorData,
              jobDateCreated: jobData.dateCreated?.toDate().toISOString(),
              jobDateUpdated: jobData.dateUpdated?.toDate().toISOString(),
            });
          }
        }
  
        return jobsWithLaborDetails;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );



const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    applying: false,
    applicationError: null,
    jobsWithLaborDetails: []

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
      })
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(applyJob.pending, (state) => {
        state.applying = true;
        state.applicationError = null;
      })
      .addCase(applyJob.fulfilled, (state) => {
        state.applying = false;
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.applying = false;
        state.applicationError = action.payload;
      })
      .addCase(applyJobWithContractor.pending, (state) => {
        state.applying = true;
        state.applicationError = null;
      })
      .addCase(applyJobWithContractor.fulfilled, (state) => {
        state.applying = false;
      })
      .addCase(applyJobWithContractor.rejected, (state, action) => {
        state.applying = false;
        state.applicationError = action.payload;
      })
      .addCase(fetchAppliedJobsByLaborId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppliedJobsByLaborId.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchAppliedJobsByLaborId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAppliedJobsByContractorId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppliedJobsByContractorId.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchAppliedJobsByContractorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchJobsWithLaborDetailsByEmployerId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobsWithLaborDetailsByEmployerId.fulfilled, (state, action) => {
        state.loading = false;
        state.jobsWithLaborDetails = action.payload;
      })
      .addCase(fetchJobsWithLaborDetailsByEmployerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobsSlice.reducer;
