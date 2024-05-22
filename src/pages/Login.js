import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });


  const { loading, error } = useSelector((state) => state.auth);

  const formValidation = () => {
    let valid = true;
    const newErrors = { ...errors };

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

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      try {
        await dispatch(signIn({ email, password }));
      } catch (error) {
        setErrors(error.message);
      }
    }
  };

  if (user) {
    const userType = user.userType;
    if (userType === "mazdoor") {
      navigate("/mazdoor/dashboard");
    } else if (userType === "employer") {
      navigate("/employer/dashboard");
    } else if (userType === "contractor") {
      navigate("/contractor/dashboard");
    }
  }

  return (
    <div>
      <section
        className="bg-no-repeat bg-cover"
        style={{ backgroundImage: 'url("/assets/images/loginbg.jpg")' }}
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-16 ">
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
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login Your Account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignIn}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="something@gmail.com"
                    required=""
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                </div>
                {
                  errors.email && (
                    <div className='text-red-400'>{errors.email}</div>
                  )
                }

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e)=> setPassword(e.target.value)}
                  />
                </div>
                {
                  errors.password && (
                    <div className='text-red-400'>{errors.password}</div>
                  )
                }
                {/* <Link to="/employer/dashboard" className="my-2"> */}
                  <button
                  disabled={loading}
                    type="submit"
                    className="w-full text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                  >
                    Login
                  </button>
                {/* </Link> */}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an Account?
                  <Link
                    to="/signup"
                    className=" ms-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
              {error && <p className="text-yellow-500">{error}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// // src/components/SignIn.js
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { signIn } from "../store/reducers/authSlice";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.auth);

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     dispatch(signIn({ email, password }));
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
//       <form onSubmit={handleSignIn}>
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
//         <button type="submit" disabled={loading}>Sign In</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default Login;
