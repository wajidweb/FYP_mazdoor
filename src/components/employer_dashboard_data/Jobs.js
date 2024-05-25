import { React, useEffect } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobsByEmployerId } from "../../store/reducers/jobSlice";

export default function Jobs({ setJobPage }) {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

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
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
