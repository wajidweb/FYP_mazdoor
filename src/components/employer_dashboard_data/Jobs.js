import React from "react";

export default function Jobs() {
  const data = [
    {
      jobImage:
        "https://static01.nyt.com/images/2020/09/27/world/27virus-children-takeaways/merlin_177528975_1c858c60-dc49-4a7b-b44b-5264d1ffbaf8-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      jobTitle: "Labor for goods shifting",
      jobLocation: "UET peshawar",
      jobDescription:
        "Looking for someone strong and ready to help move stuff from point A to point B. If you've got the muscles, we've got the gig",
    },
    {
      jobImage:
        "https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=",
      jobTitle: "Labor for goods shifting",
      jobLocation: "UET peshawar",
      jobDescription:
        "Looking for someone strong and ready to help move stuff from point A to point B. If you've got the muscles, we've got the gig",
    },
    {
      jobImage:
        "https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=",
      jobTitle: "Labor for goods shifting",
      jobLocation: "UET peshawar",
      jobDescription:
        "Looking for someone strong and ready to help move stuff from point A to point B. If you've got the muscles, we've got the gig",
    },
    {
      jobImage:
        "https://static01.nyt.com/images/2020/09/27/world/27virus-children-takeaways/merlin_177528975_1c858c60-dc49-4a7b-b44b-5264d1ffbaf8-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      jobTitle: "Labor for goods shifting",
      jobLocation: "UET peshawar",
      jobDescription:
        "Looking for someone strong and ready to help move stuff from point A to point B. If you've got the muscles, we've got the gig",
    },
    {
      jobImage:
        "https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=",
      jobTitle: "Labor for goods shifting",
      jobLocation: "UET peshawar",
      jobDescription:
        "Looking for someone strong and ready to help move stuff from point A to point B. If you've got the muscles, we've got the gig",
    },
    {
      jobImage:
        "https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=",
      jobTitle: "Labor for goods shifting",
      jobLocation: "UET peshawar",
      jobDescription:
        "Looking for someone strong and ready to help move stuff from point A to point B. If you've got the muscles, we've got the gig",
    },
  ];

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
        <div className="w-full flex flex-col justify-center  sm:flex-row sm:justify-start sm:items-center flex-wrap">
          {data.map((val, ind) => {
            return (
              <div
                className="relative  flex flex-col my-3 mx-3 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 flex-wrap"
                key={ind}
              >
                <div className="relative  mx-4 mt-2 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                  <img src={val.jobImage} alt="card-image" />
                </div>
                <div className="p-3">
                  <h5 className="block font-sans text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {val.jobTitle}
                  </h5>
                  <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    <span className="font-bold ">Location: </span>
                    {val.jobLocation}
                  </p>
                  <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    <span className="font-bold">Description: </span>
                    {val.jobDescription}
                  </p>
                </div>
                {/* <div className="w-full flex justify-end items-end py-3 px-3">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Apply
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div> */}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
