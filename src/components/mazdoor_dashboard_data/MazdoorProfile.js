import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMazdoor } from "../../store/reducers/mazdoorSlice";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function MazdoorProfile({ user, mazdoor }) {
  const [profileImage, setProfileImage] = useState(null);
  const labor = useSelector((state) => state.mazdoor.mazdoor);
  const loading = useSelector((state) => state.mazdoor.loading);
  const dispatch = useDispatch();

  // console.log("mazdoor", mazdoor);
  const [formData, setFormData] = useState({
    userId: user?.userId || "",
    name: "",
    profession: "",
    contactNumber: "",
    city: "",
    address: "",
    description: "",
    imageUrl: "",
  });

  // Update formData state when mazdoor data is available
  useEffect(() => {
    if (mazdoor) {
      setFormData((prevData) => ({
        ...prevData,
        name: mazdoor.name || "",
        profession: mazdoor.profession || "",
        contactNumber: mazdoor.contactNumber || "",
        city: mazdoor.city || "",
        address: mazdoor.address || "",
        description: mazdoor.description || "",
        imageUrl: mazdoor.imageUrl || "",
      }));
      setProfileImage(mazdoor.imageUrl || "");
    }
  }, [mazdoor]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `mazdoor_images/${user.laborId}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData((prevData) => ({ ...prevData, imageUrl: url }));
      setProfileImage(url);
    }
  };

  const [errors, setErrors] = useState({
    name: "",
    profession: "",
    contactNumber: "",
    city: "",
    address: "",
    description: "",
  });

  const formValidation = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.name || formData.name?.trim() === "") {
      newErrors.name = "Please enter name here";
      valid = false;
    } else {
      newErrors.name = "";
    }
    if (!formData.profession || formData.profession?.trim() === "") {
      newErrors.profession = "Please enter profession here";
      valid = false;
    } else {
      newErrors.profession = "";
    }
    if (!formData.contactNumber || formData.contactNumber?.trim() === "") {
      newErrors.contactNumber = "Please enter contact number here";
      valid = false;
    } else {
      newErrors.contactNumber = "";
    }

    if (!formData.city || formData.city?.trim() === "") {
      newErrors.city = "Please enter your city";
      valid = false;
    } else {
      newErrors.city = "";
    }
    if (!formData.address || formData.address?.trim() === "") {
      newErrors.address = "Please enter your address";
      valid = false;
    } else {
      newErrors.address = "";
    }
    if (!formData.description || formData.description?.trim() === "") {
      newErrors.description = "Please enter your description";
      valid = false;
    } else {
      newErrors.description = "";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValidation()) {
      if (user?.laborId) {
        dispatch(setMazdoor({ laborId: user.laborId, formData }));
        console.log("success");
      }
    }
  };

  // console.log("labor is", labor)

  return (
    <div className="w-full bg-white">
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-5">
        <p className="text-white">Your Profile</p>
      </div>

      <section className="w-full  flex justify-center items-center  py-2">
        <form className="w-2/4 mx-auto" onSubmit={handleSubmit}>
          <div className="flex justify-center items-center mx-auto p-6">
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
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span>Upload Image</span>
                )}
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="name"
                value={formData?.name || ""}
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                onChange={handleFormInputChange}
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Full Name
              </label>
              {errors.name && <div className="text-red-400">{errors.name}</div>}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="profession"
                id="profession"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                onChange={handleFormInputChange}
                value={formData?.profession || ""}
              />
              <label
                htmlFor="profession"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Profession
              </label>
              {errors.profession && (
                <div className="text-red-400">{errors.profession}</div>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                name="contactNumber"
                id="contactNumber"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                onChange={handleFormInputChange}
                value={formData?.contactNumber || ""}
              />
              <label
                htmlFor="contactNumber"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number (123-456-7890)
              </label>
              {errors.contactNumber && (
                <div className="text-red-400">{errors.contactNumber}</div>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="city"
                id="city"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                onChange={handleFormInputChange}
                value={formData?.city || ""}
              />
              <label
                htmlFor="city"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City
              </label>
              {errors.city && <div className="text-red-400">{errors.city}</div>}
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="address"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-black"
            >
              Address
            </label>
            <textarea
              value={formData?.address || ""}
              onChange={handleFormInputChange}
              name="address"
              id="address"
              rows="3"
              className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your address..."
            ></textarea>
            {errors.address && (
              <div className="text-red-400">{errors.address}</div>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="professionalDescription"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-black"
            >
              Professional Description
            </label>
            <textarea
              value={formData?.description || ""}
              name="description"
              onChange={handleFormInputChange}
              id="professionalDescription"
              rows="3"
              className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description..."
            ></textarea>
            {errors.description && (
              <div className="text-red-400">{errors.description}</div>
            )}
          </div>
          <div className="flex justify-center items-center w-full">
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-pink-600 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-md text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
            >
              {loading ? (
                <div className="flex flex-row">
                  <div role="status">
                  <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                  <span className="ml-2">UPDATING </span>
                </div>
              ) : (
                "UPDATE PROFILE"
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
