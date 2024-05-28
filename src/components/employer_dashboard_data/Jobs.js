import { React, useEffect , useState} from "react";
import { FaPlusSquare } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchJobsByEmployerId,
  deleteJob,
} from "../../store/reducers/jobSlice";

export default function Jobs({ setJobPage }) {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const [deletingJobId, setDeletingJobId] = useState(null);
  const getUserDataFromLocalStorage = () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  };

  const user = getUserDataFromLocalStorage();
  const employerId = user?.employerId;

  useEffect(() => {
    if (employerId) {
      dispatch(fetchJobsByEmployerId(employerId));
    }
  }, [dispatch, employerId]);

  const handleDelete = async (employerId, jobId) => {
    setDeletingJobId(jobId);
    await dispatch(deleteJob({ employerId, jobId }));
    setDeletingJobId(null);
  };

  console.log("all jos", jobs);

  return (
    <div className="w-full h-screen bg-slate-200">
      <section className="w-full py-7 bg-slate-700">
        <div className="w-11/12 flex justify-center items-center">
          <div>
            <button
              onClick={() => setJobPage(false)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded flex justify-between items-center"
            >
              <FaPlusSquare />{" "}
              <span className="ms-1"> Create a new Job Gig</span>
            </button>
          </div>
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
                <div className="w-full flex justify-end items-center py-2 px-2">
                  <button
                    onClick={() => handleDelete(val?.employerId, val?.id)}
                    type="button"
                    className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="w-3 h-3 text-white me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                    {deletingJobId === val.id ? "Deleting " : "Delete Job"}
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
