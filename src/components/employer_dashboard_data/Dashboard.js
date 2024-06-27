import { React, useState, useEffect } from "react";
import { fetchJobsWithLaborDetailsByEmployerId } from "../../store/reducers/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import employerSidebarData from '../utils/employerSidebarData';

export default function Dashboard({ employer, setSelectedOption }) {
  const navigate = useNavigate();
  const employerId = employer?.employerId;
  const dispatch = useDispatch();
  const { jobsWithLaborDetails, loading, error } = useSelector(
    (state) => state.jobs
  );

  useEffect(() => {
    dispatch(fetchJobsWithLaborDetailsByEmployerId(employerId));
  }, [dispatch, employerId]);

  console.log("emp", jobsWithLaborDetails);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("jobdetail>>>>", jobsWithLaborDetails);
  const startChating = (job)=>{
    setSelectedOption("Chat Hub");
  }

  return (
    <div className="w-full bg-white">
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-5">
        <p className="text-white">Dashboard</p>
      </div>

      <section className="w-full py-3 px-3">
                <div className="w-full">
          <div className="overflow-x-auto">
            <h1 className="text-2xl font-bold mb-4">Jobs with Labor Details</h1>
            {jobsWithLaborDetails.length === 0 ? (
              <p>No applications found</p>
            ) : (
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2  border-b">Job Title</th>
                    <th className="py-2 border-b">Mazdoor Name</th>
                    <th className="py-2 border-b">Profession</th>
                    <th className="py-2 border-b">CNIC</th>
                    <th className="py-2 border-b">Mobile Number</th>
                    <th className="py-2 border-b">City</th>
                    <th className="py-2 border-b">Address</th>
                    <th className="py-2 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jobsWithLaborDetails.map((job) => (
                    <tr key={job.jobId} onClick={()=> startChating(job)} className="cursor-pointer">
                      <td className="py-2 px-5 border-b">{job.jobTitle}</td>
                      <td className="py-2 px-5 border-b">
                        {job?.laborData?.name || job?.contractorData?.name}
                      </td>
                     
                      <td className="py-2 px-5 border-b">
                        {job?.laborData?.profession  || job?.contractorData?.userType}
                      </td>
                     
                      <td className="py-2 px-5 border-b">
                        {job?.laborData?.cnic  || job?.contractorData?.cnic}
                      </td>
                      <td className="py-2 px-5 border-b">
                        {job?.laborData?.contactNumber  || job?.contractorData?.contactNumber}
                      </td>
                      <td className="py-2 px-5 border-b">
                        {job?.laborData?.city  || job?.contractorData?.city}
                      </td>
                      <td className="py-2 px-5 border-b">
                        {job?.laborData?.address  || job?.contractorData?.address}
                      </td>
                      <td className="py-2 px-5 border-b" >
                        accept
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
