import { React, useState } from "react";

export default function Dashboard() {
  return (
    <div className="w-full bg-white">
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-5">
        <p className="text-white">Dashboard</p>
      </div>

      <section className="w-full py-3 px-3">
        <div className="w-full py-1">
          <p className="text-2xl text-black font-bold">Overview</p>
          <p className="text-sm text-gray-600 ">
            Welcome back, Wajid ! Your progress is really good. Keep it up
          </p>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-4">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg  dark:bg-gray-600 dark:border-gray-700 px-4 py-4">
              <div className="flex flex-col items-center">
                <div className="w-full flex flex-col justify-center items-center sm:flex-row sm:justify-around sm:items-center">
                  <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"
                    alt="Bonnie image"
                  />
                  <div className="flex flex-col justify-center items-start">
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      Wajid Ali Khan
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Profession
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      contact number
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Address
                    </span>
                  </div>
                </div>
                <div className="flex mt-2 md:mt-4">
                  <a
                    href="#"
                    className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Want to Update Profile?
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">
              <div className="py-2 px-1">
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  See Latest Jobs
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
              <div className="py-2 px-1">
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  See Jobs whome you applied!
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full py-2">
            <p className="text-xl font-bold text-black">
              Previous Jobs and Reviews
            </p>
          </div>
          <div className="w-full">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Job Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Job Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Employer Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Kitchen Repair
                    </th>
                    <td className="px-6 py-4">21 march 2024</td>
                    <td className="px-6 py-4">Shah Fahad</td>
                    <td className="px-6 py-4">UET Peshawar</td>
                    <td className="px-6 py-4">Paid</td>
                    
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Kitchen Repair
                    </th>
                    <td className="px-6 py-4">21 march 2024</td>
                    <td className="px-6 py-4">Shah Fahad</td>
                    <td className="px-6 py-4">UET Peshawar</td>
                    <td className="px-6 py-4">Unpaid</td>
                    
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Kitchen Repair
                    </th>
                    <td className="px-6 py-4">21 march 2024</td>
                    <td className="px-6 py-4">Shah Fahad</td>
                    <td className="px-6 py-4">UET Peshawar</td>
                    <td className="px-6 py-4">Paid</td>
                    
                  </tr>
                 
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
