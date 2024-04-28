import { React, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import employerSidebarData from "../utils/employerSidebarData";

export default function Sidebar({ isOpen, setSelectedOption }) {
  return (
    <div>
      <aside
        id="logo-sidebar"
        className={`z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full w-0 hidden"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Link
            to="/employer/dashboard"
            className="flex items-center justify-between ps-2.5 mb-5"
          >
            <div className="flex justify-start items-center">
              <img
                src="/assets/images/logo.png"
                className="h-6 me-3 sm:h-7"
                alt="laborEase Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                LaborEase
              </span>
            </div>
            <span className="text-white text-sm">Employer</span>
          </Link>
          <ul className="space-y-2 font-medium">
            {employerSidebarData.map((val, ind) => {
              return (
                <li key={ind}>
                  <Link
                    onClick={()=> setSelectedOption(val.text)}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path d={val.svgPath} />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {val.text}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
