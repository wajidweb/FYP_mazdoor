import React from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MazdoorDashboard from "./pages/MazdoorDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import ContractorDashboard from "./pages/ContractorDashboard";

export default function App() {
  return (
    <Provider store={store}>

    <Router>
     <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/mazdoor" element={<Layout />}>
           <Route index element={<SignUp />} />
           <Route path="signup" element={<SignUp />} />
           <Route path="login" element={<Login />} />
           <Route path="dashboard" element={<MazdoorDashboard />} />
           
        </Route>
        <Route path="/employer" element={<Layout />}>
            <Route index element={<SignUp />} />
            <Route path="signup" element={<SignUp />} />  
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<EmployerDashboard />} />
        </Route>
        <Route path="/contractor" element={<Layout />}>
             <Route index element={<SignUp />} />
             <Route path="signup" element={<SignUp />} />
             <Route path="login" element={<Login />} />
             <Route path="dashboard" element={<ContractorDashboard />} />
        </Route>
      </Routes>
    </Router>
    </Provider>
  );
}
