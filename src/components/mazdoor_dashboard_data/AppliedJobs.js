import React from "react";

export default function AppliedJobs() {
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
        "https://static01.nyt.com/images/2020/09/27/world/27virus-children-takeaways/merlin_177528975_1c858c60-dc49-4a7b-b44b-5264d1ffbaf8-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
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
        "https://static01.nyt.com/images/2020/09/27/world/27virus-children-takeaways/merlin_177528975_1c858c60-dc49-4a7b-b44b-5264d1ffbaf8-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
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
        "https://static01.nyt.com/images/2020/09/27/world/27virus-children-takeaways/merlin_177528975_1c858c60-dc49-4a7b-b44b-5264d1ffbaf8-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      jobTitle: "Labor for goods shifting",
      jobLocation: "UET peshawar",
      jobDescription:
        "Looking for someone strong and ready to help move stuff from point A to point B. If you've got the muscles, we've got the gig",
    },
  ];
  return (
    <div className="w-full bg-white">
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-5">
        <p className="text-white">Applied Jobs</p>
      </div>

      <section className="w-full py-2 px-2 overflow-auto h-screen">
        <div className="w-full flex flex-col justify-center  sm:flex-row sm:justify-start sm:items-center flex-wrap">
          {data.map((val, ind) => {
            return (
              
                <div className="relative  flex flex-col my-3 mx-3 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-64 flex-wrap" key={ind}>
                  <div className="relative  mx-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                    <img
                      src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                      alt="card-image"
                    />
                  </div>
                  <div className="p-3">
                    <h5 className="block font-sans text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                     {val.jobTitle}
                    </h5>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                     <span className="font-bold ">Location: </span>{val.jobLocation}
                    </p>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                     <span className="font-bold">Description: </span>{val.jobDescription}
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
