// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
      
      // Extract additional data
      const { name, cnic, userType } = additionalData;

      // Store user data in the "users" collection
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name,
        cnic: cnic,
        userType: userType,
        // Add any other common user data here
      });

      // Store additional user data in the appropriate collection based on userType
      if (userType === "mazdoor") {
        await setDoc(doc(db, "mazdoors", user.uid), {
          email: user.email,
          name: name,
          cnic: cnic,
          userType: userType,
          // Add any other labor-specific data here
        });
      } else if (userType === "employer") {
        await setDoc(doc(db, "employers", user.uid), {
          email: user.email,
          name: name,
          cnic: cnic,
          userType: userType,
          // Add any other employer-specific data here
        });
      } else if (userType === "contractor") {
        await setDoc(doc(db, "contractors", user.uid), {
          email: user.email,
          name: name,
          cnic: cnic,
          userType: userType,
          // Add any other contractor-specific data here
        });
      }

      // Fetch the user data to include in the Redux state
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = { uid: user.uid, ...userDoc.data() };

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
