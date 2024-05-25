import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setJob } from "../../store/reducers/jobSlice";


export default function CreateNewJob({ setJobPage }) {
  const dispatch = useDispatch();
  const loading = useSelector((state)=> state.jobs.loading);
  const error = useSelector((state)=> state.jobs.error);

  const getUserDataFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  };
  
  const user = getUserDataFromLocalStorage();
  console.log("user check", user);

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobDuration: "",
    jobCity: "",
    jobAddress: "",
    imageFile: null,
    employerName: user ? user.name : '', // Set employer name from user data
    employerId: user ? user.employerId : '',
  });

  const [errors, setErrors] = useState({
    jobTitle: "",
    jobDescription: "",
    jobDuration: "",
    jobCity: "",
    jobAddress: "",
    imageFile: "",
  });


  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFormData({
        ...formData,
        imageFile: e.target.files[0], // Set the selected image file
      });
    }
  };


  const formValidation = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.jobTitle || formData.jobTitle?.trim() === "") {
      newErrors.jobTitle = "Please enter job title here";
      valid = false;
    } else {
      newErrors.jobTitle = "";
    }
    if (!formData.jobDescription || formData.jobDescription?.trim() === "") {
      newErrors.jobDescription = "Please enter the job description here";
      valid = false;
    } else {
      newErrors.jobDescription = "";
    }
    if (!formData.jobDuration || formData.jobDuration?.trim() === "") {
      newErrors.jobDuration = "Please enter job duration";
      valid = false;
    } else {
      newErrors.jobDuration = "";
    }

    if (!formData.jobCity || formData.jobCity?.trim() === "") {
      newErrors.jobCity = "Please enter the job city";
      valid = false;
    } else {
      newErrors.jobCity = "";
    }
    if (!formData.jobAddress || formData.jobAddress?.trim() === "") {
      newErrors.jobAddress = "Please enter the job address";
      valid = false;
    } else {
      newErrors.jobAddress = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValidation()) {
        dispatch(setJob(formData))
    }
    
  };

  return (
    <div className="w-full bg-white">
      <section className=" w-full flex justify-center items-start py-2 px-2 bg-slate-300">
        <div className="w-11/12">
          <button
            onClick={() => setJobPage(true)}
            type="submit"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Back to Jobs
          </button>
          <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="flex justify-center items-center mx-auto">
            <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="block text-sm font-medium text-gray-700 cursor-pointer border-dashed border-2 border-gray-400 rounded-full w-32 h-32 flex items-center justify-center hover:border-blue-500"
            >
              {formData.imageFile ? (
                <img
                  src={URL.createObjectURL(formData.imageFile)}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span>Upload Image</span>
              )}
            </label>
          </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="jobTitle"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black "
              >
                Enter title of the job
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="plumber , waiter ....."
                required=""
                onChange={handleFormInputChange}
              />
            </div>
            {errors.jobTitle && (
              <div className="text-red-400">{errors.jobTitle}</div>
            )}

            <div className="mt-5">
              <label
                for="jobDescription"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black "
              >
                Enter full Description about the job
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="description ..."
                onChange={handleFormInputChange}
              ></textarea>
            </div>
            {errors.jobDescription && (
              <div className="text-red-400">{errors.jobDescription}</div>
            )}

            <div className="mt-5">
              <label
                htmlFor="jobDuration"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black "
              >
                Enter the job duration
              </label>
              <input
                type="text"
                id="jobDuration"
                name="jobDuration"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="1 day or 2 day or more ......"
                required=""
                onChange={handleFormInputChange}
              />
            </div>
            {errors.jobDuration && (
              <div className="text-red-400">{errors.jobDuration}</div>
            )}

            <div className="mt-5">
              <label
                htmlFor="jobCity"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black "
              >
                Enter job city name
              </label>
              <input
                type="text"
                id="jobCity"
                name="jobCity"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="city ..."
                required=""
                onChange={handleFormInputChange}
              />
            </div>
            {errors.jobCity && (
              <div className="text-red-400">{errors.jobCity}</div>
            )}

            <div className="mt-5">
              <label
                htmlFor="jobAddress"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black "
              >
                Address of the job
              </label>
              <input
                type="text"
                id="jobAddress"
                name="jobAddress"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required=""
                placeholder="address..."
                onChange={handleFormInputChange}
              />
            </div>
            {errors.jobAddress && (
              <div className="text-red-400">{errors.jobAddress}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? <span>Saving...</span> : 'Post Job'}
            </button>
          </form>
          {error && <p>Error: {error}</p>}
        </div>
      </section>
    </div>
  );
}
