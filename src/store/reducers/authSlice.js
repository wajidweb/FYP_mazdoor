// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

// Action to store user data in local storage
const storeUserDataInLocalStorage = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

// Action to retrieve user data from local storage
const getUserDataFromLocalStorage = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, additionalData }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Generate UUIDs for userId, laborId, employerId, and contractorId
      const userId = uuidv4();
      const laborId = uuidv4();
      const employerId = uuidv4();
      const contractorId = uuidv4();

      // Extract additional data
      const { name, cnic, userType } = additionalData;

      // Initialize specificId
      let specificId = null;

      // Store user data in the appropriate collection based on userType
      if (userType === "mazdoor") {
        specificId = laborId;
        // Store labor-specific data in "labors" collection
        await setDoc(doc(db, "mazdoors", laborId), {
          email: user.email,
          name: name,
          cnic: cnic,
          userType: userType,
          userId: userId, // Store userId for reference
          laborId: laborId, // Store laborId in "labors" collection
          // Add any other labor-specific data here
        });
      } else if (userType === "employer") {
        specificId = employerId;
        // Store employer-specific data in "employers" collection
        await setDoc(doc(db, "employers", employerId), {
          email: user.email,
          name: name,
          cnic: cnic,
          userType: userType,
          userId: userId, // Store userId for reference
          employerId: employerId, // Store employerId in "employers" collection
          // Add any other employer-specific data here
        });
      } else if (userType === "contractor") {
        specificId = contractorId;
        // Store contractor-specific data in "contractors" collection
        await setDoc(doc(db, "contractors", contractorId), {
          email: user.email,
          name: name,
          cnic: cnic,
          userType: userType,
          userId: userId, // Store userId for reference
          contractorId: contractorId, // Store contractorId in "contractors" collection
          // Add any other contractor-specific data here
        });
      }

      // Store user data in "users" collection with specificId labeled appropriately
      const userDocData = {
        email: user.email,
        name: name,
        cnic: cnic,
        userType: userType,
        userId: userId, // Store userId
        // Add any other common user data here
      };
      
      if (userType === "mazdoor") {
        userDocData.laborId = specificId;
      } else if (userType === "employer") {
        userDocData.employerId = specificId;
      } else if (userType === "contractor") {
        userDocData.contractorId = specificId;
      }

      await setDoc(doc(db, "users", userId), userDocData);

      // Fetch the user data to include in the Redux state
      const userDoc = await getDoc(doc(db, "users", userId));
      const userData = { uid: userId, ...userDoc.data() };

      // Store user data in local storage
      storeUserDataInLocalStorage(userData);

      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = { uid: user.uid, ...userDoc.data() };

      storeUserDataInLocalStorage(userData);

      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null, // Initialize user from local storage
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
