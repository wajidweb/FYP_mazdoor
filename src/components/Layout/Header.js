import { React, useState } from "react";
import { GrUserWorker } from "react-icons/gr";
import { BsBuildings } from "react-icons/bs";
import { TbUsersGroup } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white  w-full z-20 border-b shadow-sm py-2">
      <div className="max-w-screen-xl flex flex-col md:flex-row md:items-center justify-between mx-auto p-4">
        <div className=" flex flex-row items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/assets/images/logo.png" className="h-8" alt="logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-pink-600">
              LaborEase
            </span>
          </Link>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-5 h-5 ${isOpen ? "hidden" : "block"}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
              <svg
                className={`w-5 h-5 ${isOpen ? "block" : "hidden"}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M14.398 5.602a.75.75 0 0 1 1.06 1.06L11.06 10l4.397 4.398a.75.75 0 0 1-1.06 1.06L10 11.06l-4.398 4.397a.75.75 0 0 1-1.06-1.06L8.94 10 4.542 5.602a.75.75 0 0 1 1.06-1.06L10 8.94l4.398-4.398z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`items-center justify-between w-full ${
            isOpen ? "block" : "hidden"
          } md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link
                to="/mazdoor"
                className="block py-2 px-3 text-black rounded hover:bg-pink-300 md:bg-transparent md:hover:text-pink-300 md:p-0 md:dark:hover:text-pink-600   dark:hover:text-white md:dark:hover:bg-transparent "
                aria-current="page"
              >
                <div className="flex flex-col justify-center items-center">
                  <GrUserWorker />
                  <span>Mazdoor</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
               to='/employer'
                className="block py-2 px-3 text-black rounded  hover:bg-pink-300 md:bg-transparent md:hover:text-pink-300 md:p-0 md:dark:hover:text-pink-600    dark:hover:text-white md:dark:hover:bg-transparent "
              >
                <div className="flex flex-col justify-center items-center">
                  <BsBuildings />
                  <span>Employer</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to='/contractor'
                className="block py-2 px-3 text-black rounded hover:bg-pink-300 md:bg-transparent md:hover:text-pink-300 md:p-0 md:dark:hover:text-pink-600    dark:hover:text-white md:dark:hover:bg-transparent "
              >
                <div className="flex flex-col justify-center items-center">
                  <TbUsersGroup />
                  <span>Contractor</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-3 md:order-2 mx-1">
          <Link to='/signup'>
          <button
            type="button"
            className="text-white bg-pink-300 hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-200"
          >
            Sign Up
          </button>
          </Link>
          <Link to='/login'>
          <button
            type="button"
            className="text-white bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-200"
          >
            Login
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
