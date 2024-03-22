import React from "react";
import { IoSend } from "react-icons/io5";

export default function ChatHubMazdoor() {
  const employerData = [
    {
      employerImage:
        "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1504",
      employerName: "Wajid Ali Khan",
      lastMessage: "last message ....",
    },
    {
      employerImage:
        "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1504",
      employerName: "Wajid Ali Khan",
      lastMessage: "last message ....",
    },
    {
      employerImage:
        "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1504",
      employerName: "Wajid Ali Khan",
      lastMessage: "last message ....",
    },
    {
      employerImage:
        "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1504",
      employerName: "Wajid Ali Khan",
      lastMessage: "last message ....",
    },
    {
      employerImage:
        "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1504",
      employerName: "Wajid Ali Khan",
      lastMessage: "last message ....",
    },
    {
      employerImage:
        "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1504",
      employerName: "Wajid Ali Khan",
      lastMessage: "last message ....",
    },
  ];
  return (
    <div className="w-full bg-white">
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-5">
        <p className="text-white">Chat Hub</p>
      </div>

      <section className="w-full">
        <div className="w-full flex flex-col justify-center items-center sm:flex-row sm:justify-start sm:items-start">
          <div className="md:w-1/4 w-full bg-gray-300 h-screen flex flex-col justify-start items-center">
            <p className="text-lg text-center py-3 font-bold">MESSAGES</p>
            <div>
              <form className="max-w-md mx-auto">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-600 rounded-lg bg-gray-50 focus:ring-blue-500  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search employer ..."
                    required=""
                  />
                </div>
              </form>
            </div>
            <div className="w-full flex flex-col justify-start items-center py-2 overflow-auto h-screen">
              {employerData.map((val, ind) => {
                return (
                  <div
                    key={ind}
                    className="w-11/12 flex flex-row justify-start items-center bg-slate-400 hover:bg-slate-500 rounded-md py-2 px-2 cursor-pointer my-1"
                  >
                    <div className="w-8 h-8 rounded-full mx-3">
                      <img
                        src={val.employerImage}
                        className="w-full h-full rounded-full"
                        alt="user image"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <p className="text-sm text-white">{val.employerName}</p>
                      <p className="text-sm text-gray-300">{val.lastMessage}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full sm:w-3/4">
            <div className="w-full flex flex-col justify-start items-start">
              <div className="w-full bg-slate-200 py-4 px-4 flex flex-row justify-start items-center ">
                <div className="w-8 h-8 rounded-full mx-3">
                  <img
                    src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1504"
                    className="w-full h-full rounded-full"
                    alt="user image"
                  />
                </div>
                <p className="font-bold">Wajid Ali Khan</p>
              </div>

              <div className="w-full flex flex-col justify-start items-start">
                <div className="w-full bg-slate-50 h-96 overflow-auto">

                  <div className="flex items-start gap-2.5 py-3 px-3">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1504"
                      alt="user image"
                    />
                    <div className="flex flex-col gap-1 w-full max-w-[320px]">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          Bonnie Green
                        </span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          11:46
                        </span>
                      </div>
                      <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <p className="text-sm font-normal text-gray-900 dark:text-white">
                          {" "}
                          That's awesome. I think our users will really
                          appreciate the improvements.
                        </p>
                      </div>
                    
                    </div>
                  
                  </div>
                </div>

                <div className="w-full py-5 bg-slate-200 px-3 flex flex-row justify-between items-center">
                  <form className="w-full">
                    <input
                      type="text"
                      id="message"
                      className="block w-full py-3 px-2 ps-10 text-sm text-gray-900 border border-gray-600 rounded-lg bg-gray-50 focus:ring-blue-500  focus:border-blue-500 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="enter message here ..."
                      required=""
                    />
                  </form>
                  <div className="py-1 px-4">
                    <button className="text-lg">
                      <IoSend className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
