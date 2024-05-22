import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../store/reducers/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function SignUp() {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   cnic: "",
  //   contactNumber: "",
  //   password: "",
  // });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    cnic: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [userType, setUserType] = useState("mazdoor");
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user?.userType === "mazdoor") {
        navigate("/mazdoor/dashboard");
      } else if (user?.userType === "employer") {
        navigate("/employer/dashboard");
      } else if (user.userType === "contractor") {
        navigate("/contractor/dashboard");
      }
    }
  }, [user, navigate]);

  // const handleFormInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));

  //   setErrors((prevState) => ({
  //     ...prevState,
  //     [name]: "",
  //   }));
  // };

  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("mazdoor")) {
      setUserType("mazdoor");
    } else if (location.pathname.includes("employer")) {
      setUserType("employer");
    } else if (location.pathname.includes("contractor")) {
      setUserType("contractor");
    }
  }, [location.pathname]);

  const formValidation = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!name || name?.trim() === "") {
      newErrors.name = "Please enter name here";
      valid = false;
    } else {
      newErrors.name = "";
    }
    if (!cnic || cnic?.trim() === "") {
      newErrors.cnic = "Please enter cnic here";
      valid = false;
    } else {
      newErrors.cnic = "";
    }
    if (!email || email?.trim() === "") {
      newErrors.email = "Please enter email here";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (!password || password?.trim() === "") {
      newErrors.password = "Please enter your password";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValidation()) {
      dispatch(
        signUp({ email, password, additionalData: { name, cnic, userType } })
      );
    }
  };

  return (
    <div>
      <section
        className="bg-no-repeat bg-cover"
        style={{ backgroundImage: 'url("/assets/images/signupbg.jpg")' }}
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-96 ">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src={"/assets/images/logo.png"}
              alt="logo"
            />
            <span className="text-pink-600 font-bold">LaborEase</span>
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-4">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create account (Sign Up)
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                <div className="w-full ">
                  <select
                    className="w-full py-1 bg-gray-300 font-bold rounded"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="mazdoor">Mazdoor</option>
                    <option value="employer">Employer</option>
                    <option value="contractor">Contractor</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="wajid ...."
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                {errors.name && (
                  <div className="text-red-400">{errors.name}</div>
                )}
                <div>
                  <label
                    htmlFor="cnic"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CNIC (without dashes)
                  </label>
                  <input
                    onChange={(e) => setCnic(e.target.value)}
                    type="text"
                    name="cnic"
                    id="cnic"
                    placeholder="12345678910112"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                {errors.cnic && (
                  <div className="text-red-400">{errors.cnic}</div>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="password"
                    placeholder="something@gmail.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                {errors.email && (
                  <div className="text-red-400">{errors.email}</div>
                )}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                {errors.password && (
                  <div className="text-red-400">{errors.password}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4  text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                >
                  Create account
                </button>
                {/* </Link> */}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
              {error && <p>{error}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// // src/components/SignUp.js
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { signUp } from "../store/reducers/authSlice";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.auth);

//   const handleSignUp = (e) => {
//     e.preventDefault();
//     dispatch(signUp({ email, password }));
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSignUp}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" disabled={loading}>Sign Up</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default SignUp;
