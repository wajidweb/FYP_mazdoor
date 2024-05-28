import { React, useState, useEffect } from "react";
import {
  applyJobWithContractor,
  fetchJobs,
} from "../../store/reducers/jobSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Jobs() {
  const dispatch = useDispatch();
  const { jobs, loading, error, applying, applicationError } = useSelector(
    (state) => state.jobs
  );
  const contractorId = useSelector((state) => state.auth.user.contractorId);
  const [applyingJobId, setApplyingJobId] = useState(null);

  console.log("contractorId", contractorId);
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  console.log("jobs ", jobs);
  const handleApply = async (jobId) => {
    setApplyingJobId(jobId); // Set the applying job ID to the clicked job
    await dispatch(applyJobWithContractor({ jobId, contractorId }));
    setApplyingJobId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full ">
        <button
          disabled=""
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 me-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-slate-200">
      <section className="w-full flex justify-center items-center py-7 bg-slate-700">
        <div className="w-11/12">
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
                className="block w-full p-4 ps-10 text-sm text-gray-900   rounded-lg bg-gray-50 focus:ring-blue-500  dark:bg-slate-300 dark:placeholder-black dark:text-black "
                placeholder="Search job ..."
                required=""
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="w-full py-2 px-2 overflow-auto h-screen">
        <div className="w-full flex flex-col justify-center sm:flex-row sm:justify-start sm:items-start flex-wrap">
          {jobs.map((val, ind) => {
            return (
              <div
                className="relative flex flex-col my-3 mx-3 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 h-96 overflow-hidden"
                key={ind}
              >
                <div className="relative mx-4 mt-2 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 h-40">
                  <img
                    src={val.imageUrl}
                    alt="card-image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 overflow-auto">
                  <h2 className="block font-sans text-md antialiased font-bold leading-snug tracking-normal text-blue-gray-900">
                    <span className="font-bold">Job Title: </span>
                    {val.jobTitle}
                  </h2>
                  <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    <span className="font-bold">Job Duration: </span>
                    {val.jobDuration}
                  </p>
                  <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    <span className="font-bold">City: </span>
                    {val.jobCity}
                  </p>
                  <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    <span className="font-bold">Address: </span>
                    {val.jobAddress}
                  </p>
                  <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    <span className="font-bold">Employer: </span>
                    {val.employerName}
                  </p>
                  <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    <span className="font-bold">Description: </span>
                    {val.jobDescription}
                  </p>
                </div>
                <div className="w-full flex justify-end items-end py-3 px-3">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleApply(val.id)}
                    disabled={applyingJobId === val.id} // Disable button only for the currently applying job
                  >
                    {applyingJobId === val.id ? "Applying..." : "Apply"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
