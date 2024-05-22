import { React, useState } from "react";

export default function EmployerProfile() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    contactNumber: "",
    city: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    companyName: "",
    contactNumber: "",
    city: "",
    address: "",
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
    if (!formData.companyName || formData.companyName?.trim() === "") {
      newErrors.companyName = "Please enter company name here";
      valid = false;
    } else {
      newErrors.companyName = "";
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
      console.log("success", formData);
    }
    else{
      console.log("unsuccess")
    }
  };

  console.log("formdata is", formData);

  return (
    <div className="w-full bg-white">
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-5">
        <p className="text-white">Your Profile</p>
      </div>

      <section className="w-full  flex justify-center items-center  py-2">
        <form className="w-2/4 mx-auto " onSubmit={handleSubmit}>
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
                {image ? (
                  <img
                    src={image}
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
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                value={formData?.name || ""}
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
                name="companyName"
                id="companyName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                value={formData?.companyName || ""}
                onChange={handleFormInputChange}
              />
              <label
                htmlFor="companyName"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Company Name (if not - then enter your name)
              </label>
              {errors.companyName && <div className="text-red-400">{errors.companyName}</div>}
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
                value={formData?.contactNumber || ""}
                onChange={handleFormInputChange}
              />
              <label
                htmlFor="contactNumber"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number (123-456-7890)
              </label>
              {errors.contactNumber && <div className="text-red-400">{errors.contactNumber}</div>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="city"
                id="city"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                value={formData?.city || ""}
                onChange={handleFormInputChange}
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
              id="address"
              rows="3"
              className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your address..."
              value={formData?.address || ""}
              name = "address"
              onChange={handleFormInputChange}
            ></textarea>
              {errors.address && <div className="text-red-400">{errors.address}</div>}
          </div>
         
          <div className="flex justify-center items-center w-full">
            <button
              type="submit"
              className="text-white bg-pink-600 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-md text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
            >
              UPDATE PROFILE
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
