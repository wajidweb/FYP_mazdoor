import { React, useState } from "react";

export default function Dashboard() {
  const cardData = [
    {
      image:
        "https://www.safetyandhealthmagazine.com/ext/resources/images/news/construction/older-male-construction-worker.jpg?t=1698244045&width=768",
      name: "Wajid Ali Khan",
      profession: "Plumber",
      city: "Peshawar",
      description:
        "A hardworking individual with a knack for getting things done efficiently and a positive attitude towards every task.",
      contactNumber: "03481970849",
      address: "Tribal Hostel Uet Peshawar",
    },
    {
      image:
        "https://www.safetyandhealthmagazine.com/ext/resources/images/news/construction/older-male-construction-worker.jpg?t=1698244045&width=768",
      name: "Wajid Ali Khan",
      profession: "Plumber",
      city: "Peshawar",
      description:
        "A hardworking individual with a knack for getting things done efficiently and a positive attitude towards every task.",
      contactNumber: "03481970849",
      address: "Tribal Hostel Uet Peshawar",
    },
    {
      image:
        "https://www.safetyandhealthmagazine.com/ext/resources/images/news/construction/older-male-construction-worker.jpg?t=1698244045&width=768",
      name: "Wajid Ali Khan",
      profession: "Plumber",
      city: "Peshawar",
      description:
        "A hardworking individual with a knack for getting things done efficiently and a positive attitude towards every task.",
      contactNumber: "03481970849",
      address: "Tribal Hostel Uet Peshawar",
    },
    {
      image:
        "https://www.safetyandhealthmagazine.com/ext/resources/images/news/construction/older-male-construction-worker.jpg?t=1698244045&width=768",
      name: "Wajid Ali Khan",
      profession: "Plumber",
      city: "Peshawar",
      description:
        "A hardworking individual with a knack for getting things done efficiently and a positive attitude towards every task.",
      contactNumber: "03481970849",
      address: "Tribal Hostel Uet Peshawar",
    },
    {
      image:
        "https://www.safetyandhealthmagazine.com/ext/resources/images/news/construction/older-male-construction-worker.jpg?t=1698244045&width=768",
      name: "Wajid Ali Khan",
      profession: "Plumber",
      city: "Peshawar",
      description:
        "A hardworking individual with a knack for getting things done efficiently and a positive attitude towards every task.",
      contactNumber: "03481970849",
      address: "Tribal Hostel Uet Peshawar",
    },
    {
      image:
        "https://www.safetyandhealthmagazine.com/ext/resources/images/news/construction/older-male-construction-worker.jpg?t=1698244045&width=768",
      name: "Wajid Ali Khan",
      profession: "Plumber",
      city: "Peshawar",
      description:
        "A hardworking individual with a knack for getting things done efficiently and a positive attitude towards every task.",
      contactNumber: "03481970849",
      address: "Tribal Hostel Uet Peshawar",
    },
  ];
  const Card = ({ data }) => {
    return (
      <div className="w-full mx-2 my-2 px-1 py-1 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-pink-200">
        <div className="flex flex-col items-center pb-10">
          <div className=" w-full flex flex-col md:flex-row justify-evenly items-center py-3">
            <img
              className="w-16 h-16 rounded-full shadow-lg"
              src="https://www.safetyandhealthmagazine.com/ext/resources/images/news/construction/older-male-construction-worker.jpg?t=1698244045&width=768"
              alt="worker image"
            />
            <div className="flex flex-col justify-center items-start">
              <p>
                <span className="font-bold">Name :</span> {data.name}
              </p>
              <p>
                <span className="font-bold">Profession :</span>
                {data.profession}
              </p>
              <p>
                <span className="font-bold">City :</span> {data.city}
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <p className="px-2">
              <span className="font-bold">Profession Description:</span>{" "}
              {data.description}
            </p>
            <p className="mt-1 px-2">
              <span className="font-bold">Mobile Number: </span>{" "}
              {data.contactNumber}
            </p>
            <p className="mt-1 px-2">
              <span className="font-bold">Address: </span> {data.address}
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full bg-white">
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-5">
        <p className="text-white">Contractor Dashboard</p>
      </div>

      <section className="w-full py-3 px-5" >
        <div className="py-3 flex flex-col justify-center items-start">
          <p className="font-bold">Want to add mazdoor ?</p>
          <form className="w-full" >
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
                className="block w-full p-4 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
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
        <div>
          <p className="font-bold">Your Registered Mazdoors</p>
          <div className="flex justify-between items-center flex-wrap">
            {cardData.map((val, ind) => {
              return <Card data={val} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
