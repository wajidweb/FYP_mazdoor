import React from "react";

export default function CreateNewJob({setJobPage}) {
  return (
    <div className="w-full bg-white">
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-5 flex justify-between items-center">
        <p className="text-white">Create Job</p>
        <button
        onClick={()=> setJobPage(true)}
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Back to Jobs
        </button>
      </div>

      <section className=" w-full flex justify-center items-center py-10 px-7 bg-slate-300">
        <div className="w-11/12">
          <form className="max-w-sm mx-auto">
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black "
              >
                Enter title of the job
              </label>
              <input
                type="title"
                id="title"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="plumber , waiter ....."
                required=""
              />
            </div>
            <div className="mb-5">
              <label
                for="description"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black "
              >
                Enter full Description about the job
              </label>
              <textarea
                id="description"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="description ..."
              ></textarea>
            </div>
            <div className="mb-5">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black "
              >
                Address of the job
              </label>
              <input
                type="text"
                id="address"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required=""
                placeholder="address..."
              />
            </div>

            <button
            onClick={()=> setJobPage(true)}
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Post Job
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
