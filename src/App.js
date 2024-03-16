import React from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";

export default function App() {
  return (
    <Provider store={store}>

    <Router>
     <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/mazdoor" element={<Layout />}>
          
        </Route>
        <Route path="/Employer" element={<Layout />}>

        </Route>
        <Route path="/contractor" element={<Layout />}>

        </Route>
      </Routes>
    </Router>
    </Provider>
  );
}
